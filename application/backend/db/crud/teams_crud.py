from sqlalchemy.orm import Session
from db.models import Team, Project
from schemas.team_schema import TeamCreate


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

@staticmethod
def create_team(db: Session, team: TeamCreate):
        """
        Creates a new team.

        Parameters:
        - db (Session): The database session.
        - team (TeamCreate): The team.

        Returns:
        The created team.
        """
        # Create a new Analyzer object

        new_team = Team(**team.model_dump())
        db.add(new_team)
        db.commit()
        db.refresh(new_team)

        return new_team
