from sqlalchemy.orm import Session
from db.models import Team, Repository


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


def get_team_repositiories(db: Session, team_id: int):
    """
    Retrieves a all repositories for a specific team.

    Parameters:
    - db (Session)
    - team_id: int

    Returns:
    A list of all repositoris for the specified team.
    """
    return db.query(Repository).filter(Repository.team_id == team_id).all()
