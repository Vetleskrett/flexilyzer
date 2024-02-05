from services.analyzers_service import AnalyzerService
from services.assignments_service import AssignmentService
from services.projects_service import ProjectsService
from db.crud.batches_crud import BatchesRepository
from db.crud.projects_crud import ProjectRepository
from schemas.batch_schema import BatchCreate
from schemas.shared import BatchEnum

from celery_app.tasks import run_analyzer

from fastapi import HTTPException


class JobsService:
    @staticmethod
    def run_job(db, analyzer_id, assignment_id, project_ids):
        analyzer = AnalyzerService.get_analyzer(db, analyzer_id=analyzer_id)
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

        if not analyzer.has_requirements or not analyzer.has_script:
            raise HTTPException(
                status_code=400,
                detail=f"Analyzer with id {analyzer_id} is missing one or more of the following: 'requirements', 'script'",
            )

        if project_ids is None:
            project_ids = ProjectRepository.get_project_ids_by_assignment_id(
                db=db, assignment_id=assignment_id
            )
            if not project_ids:
                raise HTTPException(
                    status_code=400,
                    detail=f"Assignment with id {assignment_id} dont have any projects related to itself",
                )

        project_ids = [id for id, in project_ids]

        batch = BatchesRepository.create_batch(
            db=db,
            batch=BatchCreate(assignment_id=assignment_id, analyzer_id=analyzer_id),
        )

        run_analyzer.delay(project_ids, batch.id)

        return "Job started successfully"
