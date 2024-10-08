from typing import List
from fastapi import APIRouter, Depends
from schemas import team_schema, project_schema

from services.teams_service import TeamService
from db.database import get_db


router = APIRouter(prefix="/api/v1/teams")


@router.get("/", operation_id="get-all-teams")
async def get_all_teams(db=Depends(get_db)) -> List[team_schema.TeamResponse]:
    return TeamService.get_all_teams(db)


@router.get("/{team_id}", operation_id="get-team")
async def get_team(
    team_id: int, db=Depends(get_db)
) -> List[team_schema.TeamResponse]:
    return TeamService.get_team(db, team_id)


@router.get("/{team_id}/projects", operation_id="get-team-projects")
async def get_team_projects(
    team_id: int, db=Depends(get_db)
) -> List[project_schema.ProjectResponse]:
    return TeamService.get_team_projects(db, team_id)

@router.post("/", operation_id="post-team")
async def post_team(team: team_schema.TeamCreate, db=Depends(get_db)):
    return TeamService.post_team(db=db, team=team)

@router.post("/{course_id}/{number_of_teams}", operation_id="post-teams")
async def post_teams(course_id: int, number_of_teams: int, db=Depends(get_db)):
    return TeamService.post_teams(db=db, course_id=course_id, number_of_teams=number_of_teams)
