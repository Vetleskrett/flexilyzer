from services.analyzers_service import AnalyzerService
from services.assignments_service import AssingmentService
from services.projects_service import ProjectsService

from celery_app.run_task import celery_task

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

        celery_task.delay(analyzer_id, project_ids)

        return {"status": "Job started successfully", "code": 0}
