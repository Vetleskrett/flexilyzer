from typing import List
from fastapi import APIRouter, Depends
from schemas import team_schema, repository_schema

from services.teams_service import TeamService
from db.database import get_db


router = APIRouter(prefix="/api/v1/teams")


@router.get("/", operation_id="get-all-teams")
async def get_all_teams(db=Depends(get_db)) -> List[team_schema.TeamResponse]:
    return TeamService.get_all_teams(db)


@router.get("/{team_id}", operation_id="get-team")
async def get_all_teams(
    team_id: int, db=Depends(get_db)
) -> List[team_schema.TeamResponse]:
    return TeamService.get_team(db, team_id)


@router.get("/{team_id}/repositories", operation_id="get-team-repositories")
async def get_all_teams(
    team_id: int, db=Depends(get_db)
) -> List[team_schema.TeamResponse]:
    return TeamService.get_team_repossities(db, team_id)
