from utils.fileUtils import store_file, script_exists
from utils.validationUtils import validatePydanticToHTTPError
from schemas.analyzer_schema import RequirementsSchema
from services.analyzers_service import AnalyzerService
from services.assignments_service import AssignmentService
from services.projects_service import ProjectsService
from db.crud.batches_crud import BatchesRepository
from schemas.batch_schema import BatchCreate
from schemas.shared import BatchEnum

from celery_app.tasks import celery_task, create_venv_from_requirements

from fastapi import HTTPException, UploadFile


class JobsService:
    @staticmethod
    def run_job(db, analyzer_id, assignment_id, project_ids):
        AnalyzerService.get_analyzer(db, analyzer_id=analyzer_id)
        AssignmentService.get_assignment(db, assignment_id=assignment_id)

        if project_ids:
            errors = []
            for project_id in project_ids:
                try:
                    ProjectsService.get_project(db, project_id=project_id)
                except HTTPException:
                    errors.append(project_id)

            if errors:
                raise HTTPException(
                    status_code=404,
                    detail=f"Project(s) with id {' '.join(str(e) for e in errors)} not found",
                )

        batch = BatchesRepository.create_batch(
            db=db,
            batch=BatchCreate(assignment_id=assignment_id, analyzer_id=analyzer_id),
        )

        batch = BatchesRepository.update_batch_status(
            db, batch_id=batch.id, status=BatchEnum.STARTED
        )

        celery_task.delay(analyzer_id, project_ids, batch.id)

        return {"status": "Job started successfully", "code": 0}

    @staticmethod
    async def upload_requirements(db, analyzer_id, file: UploadFile):
        validatePydanticToHTTPError(RequirementsSchema, {"file_name": file.filename})
        analyzer = AnalyzerService.get_analyzer(db=db, analyzer_id=analyzer_id)

        if script_exists(analyzer_id, requirements=True):
            raise HTTPException(
                status_code=409,
                detail=f"Requirements.txt for analyzer with id {analyzer_id} is already uploaded",
            )

        await store_file(analyzer_id=analyzer.id, file=file, requirements=True)

        create_venv_from_requirements.delay(analyzer_id)

        return 1
