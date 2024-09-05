from typing import List
from fastapi import HTTPException
from db.crud.projects_crud import ProjectRepository
from schemas.project_schema import ProjectMetadataResponse, ProjectCreate, ProjectBase, ProjectMetadataBase
from services.teams_service import TeamService
from services.assignments_service import AssignmentService

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
    def create_project(db, project: ProjectCreate):
        team_id = project.team_id
        TeamService.get_team(db=db, team_id=team_id)

        assignment_id = project.assignment_id
        AssignmentService.get_assignment(db=db, assignment_id=assignment_id)

        existing_project = AssignmentService.get_assignment_team_project(
            db=db,
            assignment_id=assignment_id,
            team_id=team_id
        )

        if existing_project:
            ProjectRepository.delete_project(db=db, project_id=existing_project.id)

        project_base = ProjectBase(team_id=team_id, assignment_id=assignment_id)
        project_record = ProjectRepository.create_project(db=db, project=project_base)
        project_id = project_record.id

        for project_metadata in project.project_metadata:
            project_metadata_base = ProjectMetadataBase(
                value=project_metadata.value,
                project_id=project_id,
                assignment_metadata_id=project_metadata.assignment_metadata_id
            )
            ProjectRepository.create_project_metadata(db=db, project_metadata=project_metadata_base)

    @staticmethod
    def get_project_reports(db, project_id: int):
        ProjectsService.get_project(db, project_id)

        return ProjectRepository.get_project_reports(db, project_id=project_id)

    @staticmethod
    def get_project_metadata(db, project_id: int) -> List[ProjectMetadataResponse]:
        return ProjectRepository.get_project_metadata_for_project(db, project_id)
