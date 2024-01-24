from typing import List
from fastapi import APIRouter, Depends
from schemas import reports_schema, project_schema

from services.projects_service import ProjectsService
from db.database import get_db


router = APIRouter(prefix="/api/v1/projects")


@router.get("/", operation_id="get-all-projects")
async def get_all_teams(
    db=Depends(get_db),
) -> List[project_schema.ProjectResponse]:
    return ProjectsService.get_all_projects(db)


@router.get("/{project_id}", operation_id="get-project")
async def get_all_teams(
    project_id: int, db=Depends(get_db)
) -> project_schema.ProjectResponse:
    return ProjectsService.get_project(db, project_id)


@router.get("/{project_id}/reports", operation_id="get-project-reports")
async def get_all_teams(
    project_id: int, db=Depends(get_db)
) -> List[reports_schema.ReportResponse]:
    return ProjectsService.get_project_reports(db, project_id=project_id)
