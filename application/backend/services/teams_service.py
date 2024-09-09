from fastapi import HTTPException

from db.crud import teams_crud
from schemas.team_schema import TeamCreate


class TeamService:
    @staticmethod
    def get_all_teams(db):
        return teams_crud.get_teams(db)

    @staticmethod
    def get_team(db, team_id):
        team = teams_crud.get_team(db, team_id)
        if not team:
            raise HTTPException(
                status_code=404, detail=f"Team with id {team_id} not found"
            )
        return team

    @staticmethod
    def get_team_projects(db, team_id):
        TeamService.get_team(db, team_id)

        return teams_crud.get_team_projects(db, team_id)

    @staticmethod
    def post_team(db, team: TeamCreate):
        return teams_crud.create_team(db=db, team=team)

    @staticmethod
    def post_teams(db, course_id, number_of_teams):
        teams = []
        for _ in range(number_of_teams):
            team = TeamCreate(course_id=course_id)
            teams.append(teams_crud.create_team(db=db, team=team))
        return teams
