from sqlalchemy.orm import Session
from db.models import Project, Report


def get_projects(db: Session):
    """
    Retrieves all projects

    Parameters:
    - db (Session)

    Returns:
    A list of all projects
    """
    return db.query(Project).all()


def get_project(db: Session, project_id: int):
    """
    Retrieves a specific project

    Parameters:
    - db (Session)
    - prokect_id: int

    Returns:
    The requested project if found, otherwise None
    """
    return db.query(Project).filter(Project.id == project_id).first()


def get_project_reports(db: Session, project_id: int):
    """
    Retrives all reports for the specified project

    Parameters:
    - db (Session)
    - project_id: int

    Returns:
    List with all reports for the specified project
    """
    return db.query(Report).filter(Report.project_id == project_id).all()
