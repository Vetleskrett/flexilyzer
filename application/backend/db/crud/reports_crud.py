from sqlalchemy.orm import Session
from db.models import (
    Report,
)


def get_reports(db: Session):
    """
    Retrieves all reports

    Parameters:
    - db (Session)

    Returns:
    A list of all reports
    """
    return db.query(Report).all()


def get_report(db: Session, report_id: int):
    """
    Retrieves a specific report

    Parameters:
    - db (Session)
    - report_id: int

    Returns:
    The requested report if found, otherwise None
    """
    return db.query(Report).filter(Report.id == report_id).first()
