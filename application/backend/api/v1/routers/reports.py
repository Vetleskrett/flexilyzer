from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schemas import reports_schema

from services.reports_service import (
    ReportService,
)
from db.database import get_db

router = APIRouter(prefix="/api/v1/reports")


@router.get("/", operation_id="get-all-reports")
async def get_all_reports(
    db: Session = Depends(get_db),
) -> List[reports_schema.ReportResponse]:
    return ReportService.get_all_reports(db)


@router.get("/{report_id}", operation_id="get-report")
async def get_report(
    report_id: int, db: Session = Depends(get_db)
) -> reports_schema.ReportResponse:
    return ReportService.get_report(db, report_id)
