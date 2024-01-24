from typing import List
from fastapi import APIRouter, Depends, UploadFile, File
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


@router.get("/{analyzer_id}/io", operation_id="get-analyzer-io")
async def get_analyzer_io(
    analyzer_id: int, db=Depends(get_db)
) -> List[analyzer_schema.AnalyzerIOResponse]:
    return AnalyzerService.get_analyzer_io(db, analyzer_id=analyzer_id)


@router.post("/", operation_id="post-analyzer-metadata")
async def post_analyzer_metadata(
    analyzer: analyzer_schema.AnalyzerCreate, db: Session = Depends(get_db)
) -> analyzer_schema.AnalyzerResponse:
    return AnalyzerService.post_analyzer(db=db, analyzer=analyzer)


@router.post("/{analyzer_id}/upload/script", operation_id="upload-analyzer-script")
async def upload_analyzer_script(
    analyzer_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
) -> int:
    return AnalyzerService.upload_script(db=db, analyzer_id=analyzer_id, file=file)


@router.post(
    "/{analyzer_id}/upload/requirements", operation_id="upload-analyzer-requirements"
)
async def upload_analyzer_requirements(
    analyzer_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
) -> int:
    return AnalyzerService.upload_requirements(
        db=db, analyzer_id=analyzer_id, file=file
    )
