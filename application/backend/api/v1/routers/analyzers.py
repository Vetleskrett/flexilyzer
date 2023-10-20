from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schemas import analyzer_schema

from services.analyzers_service import (
    AnalyzerService,
)

from db.database import get_db

router = APIRouter(prefix="/api/v1/analyzers")


@router.get("/", operation_id="get-all-analyzers")
async def get_all_analyzers(
    db: Session = Depends(get_db),
) -> List[analyzer_schema.AnalyzerResponse]:
    return AnalyzerService.get_all_analyzers(db)


@router.get("/{analyzer_id}", operation_id="get-analyzer")
async def get_analyzer(
    analyzer_id: int, db: Session = Depends(get_db)
) -> analyzer_schema.AnalyzerResponse:
    return AnalyzerService.get_analyzer(db, analyzer_id)
