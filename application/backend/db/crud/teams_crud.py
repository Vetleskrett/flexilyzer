from sqlalchemy.orm import Session
from db.models import Team, Project


def get_teams(db: Session):
    """
    Retrieves all teams

    Parameters:
    - db (Session)

    Returns:
    A list of all teams
    """
    return db.query(Team).all()


def get_team(db: Session, team_id: int):
    """
    Retrieves a specific team

    Parameters:
    - db (Session)
    - team_id: int

    Returns:
    The requested team if found, otherwise None
    """
    return db.query(Team).filter(Team.id == team_id).first()


def get_team_projects(db: Session, team_id: int):
    """
    Retrieves a all projects for a specific team.

    Parameters:
    - db (Session)
    - team_id: int

    Returns:
    A list of all projects for the specified team.
    """
    return db.query(Project).filter(Project.team_id == team_id).all()
