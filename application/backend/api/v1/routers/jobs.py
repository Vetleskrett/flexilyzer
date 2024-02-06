from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schemas import job_schema

from services.jobs_service import (
    JobsService,
)

from db.database import get_db

router = APIRouter(prefix="/api/v1/jobs")


@router.post("/{analyzer}", operation_id="run-job")
async def run_job(
    data: job_schema.JobCreate,
    analyzer: int,
    db: Session = Depends(get_db),
) -> str:
    return JobsService.run_job(db, analyzer, data.assignment_id, data.project_ids)
