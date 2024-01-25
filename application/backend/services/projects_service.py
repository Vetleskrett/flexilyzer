from fastapi import HTTPException
from db.crud import (
    projects_crud,
)


class ProjectsService:
    @staticmethod
    def get_all_projects(db):
        return projects_crud.get_projects(db)

    @staticmethod
    def get_project(db, project_id: int):
        project = projects_crud.get_project(db, project_id)
        if not project:
            raise HTTPException(
                status_code=404, detail=f"Project with id {project_id} not found"
            )
        return project

    @staticmethod
    def get_project_reports(db, project_id: int):
        ProjectsService.get_project(db, project_id)

        return projects_crud.get_project_reports(db, project_id=project_id)
