from services.analyzers_service import AnalyzerService
from services.assignments_service import AssingmentService
from services.projects_service import ProjectsService
from db.crud.batches_crud import BatchesRepository
from schemas.batch_schema import BatchCreate
from schemas.shared import BatchEnum

from celery_app.tasks import celery_task

from fastapi import HTTPException


class JobsService:
    @staticmethod
    def run_job(db, analyzer_id, assignment_id, project_ids):
        AnalyzerService.get_analyzer(db, analyzer_id=analyzer_id)
        AssingmentService.get_assignment(db, assignment_id=assignment_id)

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
