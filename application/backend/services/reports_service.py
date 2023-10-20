from fastapi import HTTPException
from db.crud import (
    reports_crud,
)


class ReportService:
    @staticmethod
    def get_all_reports(db):
        return reports_crud.get_reports(db)

    @staticmethod
    def get_report(db, report_id: int):
        report = reports_crud.get_report(db, report_id)
        if not report:
            raise HTTPException(status_code=404, detail="Report not found")
        return report
