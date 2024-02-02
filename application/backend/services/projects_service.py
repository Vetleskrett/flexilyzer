from typing import List
from fastapi import HTTPException
from db.crud.projects_crud import ProjectRepository
from schemas.project_schema import ProjectMetadataResponse


class ProjectsService:
    @staticmethod
    def get_all_projects(db):
        return ProjectRepository.get_projects(db)

    @staticmethod
    def get_project(db, project_id: int):
        project = ProjectRepository.get_project(db, project_id)
        if not project:
            raise HTTPException(
                status_code=404, detail=f"Project with id {project_id} not found"
            )
        return project

    @staticmethod
    def get_project_reports(db, project_id: int):
        ProjectsService.get_project(db, project_id)

        return ProjectRepository.get_project_reports(db, project_id=project_id)

    @staticmethod
    def get_project_metadata(db, project_id: int) -> List[ProjectMetadataResponse]:
        return ProjectRepository.get_project_metadata_for_project(db, project_id)
