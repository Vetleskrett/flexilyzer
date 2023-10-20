from typing import List
from fastapi import APIRouter, Depends
from schemas import repository_schema, reports_schema

from services.repositories_service import RepositoriesService
from db.database import get_db


router = APIRouter(prefix="/api/v1/repositories")


@router.get("/", operation_id="get-all-repositories")
async def get_all_teams(
    db=Depends(get_db),
) -> List[repository_schema.RepositoryResponse]:
    return RepositoriesService.get_all_repositories(db)


@router.get("/{repository_id}", operation_id="get-repository")
async def get_all_teams(
    repository_id: int, db=Depends(get_db)
) -> repository_schema.RepositoryResponse:
    return RepositoriesService.get_repository(db, repository_id)


@router.get("/{repository_id}/reports", operation_id="get-repository-reports")
async def get_all_teams(
    repository_id: int, db=Depends(get_db)
) -> List[reports_schema.ReportResponse]:
    return RepositoriesService.get_repository_reports(db, repository_id=repository_id)
