from sqlalchemy.orm import Session
from db.models import Repository, Report


def get_repositories(db: Session):
    """
    Retrieves all repositories

    Parameters:
    - db (Session)

    Returns:
    A list of all repositories
    """
    return db.query(Repository).all()


def get_repository(db: Session, repository_id: int):
    """
    Retrieves a specific repository

    Parameters:
    - db (Session)
    - repository_id: int

    Returns:
    The requested repository if found, otherwise None
    """
    return db.query(Repository).filter(Repository.id == repository_id).first()


def get_repository_reports(db: Session, repository_id: int):
    """
    Retrives all reports for the specified repository

    Parameters:
    - db (Session)
    - repository_id: int

    Returns:
    List with all reports for the specified repossitory
    """
    return db.query(Report).filter(Report.repository_id == repository_id).all()
