import json
from sqlalchemy.orm import Session
from db.models import (
    Report,
)
from schemas.reports_schema import ReportCreate


class ReportRepository:
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

    @staticmethod
    def create_report(db: Session, report: ReportCreate):
        """
        Create a new report.

        Parameters:
        - db (Session): The database session.
        - report (ReportCreate): The report data.

        Returns:
        The created report.
        """
        db_report = Report(
            report=json.dumps(report.report),
            project_id=report.project_id,
            batch_id=report.batch_id,
        )
        db.add(db_report)
        db.commit()
        db.refresh(db_report)
        return db_report
