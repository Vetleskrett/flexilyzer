from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schemas import analyzer_schema

from services.analyzers_service import AnalyzerService

from db.database import get_db

router = APIRouter(prefix="/api/v1/analyzers")


@router.get("/", operation_id="get-all-analyzers")
async def get_all_analyzers(
    db: Session = Depends(get_db),
) -> List[analyzer_schema.AnalyzerSimplifiedResponse]:
    return AnalyzerService.get_all_analyzers(db)


@router.get("/{analyzer_id}", operation_id="get-analyzer")
async def get_analyzer(
    analyzer_id: int, db: Session = Depends(get_db)
) -> analyzer_schema.AnalyzerSimplifiedResponse:
    return AnalyzerService.get_analyzer(db, analyzer_id)


@router.get("/{analyzer_id}/inputs", operation_id="get-analyzer-inputs")
async def get_analyzer_inputs(
    analyzer_id: int, db=Depends(get_db)
) -> List[analyzer_schema.AnalyzerInputResponse]:
    return AnalyzerService.get_analyzer_inputs(db, analyzer_id=analyzer_id)


@router.get("/{analyzer_id}/outputs", operation_id="get-analyzer-outputs")
async def get_analyzer_outputs(
    analyzer_id: int, db=Depends(get_db)
) -> List[analyzer_schema.AnalyzerOutputResponse]:
    return AnalyzerService.get_analyzer_outputs(db, analyzer_id=analyzer_id)


@router.post("/", operation_id="post-analyzer")
async def post_analyzer(
    analyzer: analyzer_schema.AnalyzerCreate, db: Session = Depends(get_db)
) -> analyzer_schema.AnalyzerResponse:
    return AnalyzerService.post_analyzer(db=db, analyzer=analyzer)


# @router.put("/{analyzer_id}", operation_id="update-analyzer")
# async def update_analyzer(
#     analyzer_id: int,
#     analyzer: analyzer_schema.AnalyzerCreate,
#     db: Session = Depends(get_db),
# ) -> analyzer_schema.AnalyzerResponse:
#     return AnalyzerService.update_analyzer(db, analyzer)


@router.post("/template", operation_id="get-analyzer-template")
async def get_analyzer_template(
    analyzer: analyzer_schema.AnalyzerCreate,
) -> str:
    return AnalyzerService.get_analyzer_template(analyzer=analyzer)


@router.post("/{analyzer_id}/upload/script", operation_id="upload-analyzer-script")
async def upload_analyzer_script(
    analyzer_id: int,
    file: analyzer_schema.FileUpload,
    db: Session = Depends(get_db),
) -> str:
    return await AnalyzerService.upload_script(
        db=db, analyzer_id=analyzer_id, file=file
    )


@router.delete(
    "/{analyzer_id}/script", operation_id="delete-analyzer-script", status_code=204
)
async def delete_analyzer_script(
    analyzer_id: int,
    db: Session = Depends(get_db),
) -> None:
    return AnalyzerService.delete_script(db=db, analyzer_id=analyzer_id)


@router.get("/{analyzer_id}/script", operation_id="get-analyzer-script")
async def get_analyzer_script(
    analyzer_id: int,
    db: Session = Depends(get_db),
) -> str:
    return AnalyzerService.get_script(db=db, analyzer_id=analyzer_id)


@router.get("/{analyzer_id}/requirements", operation_id="get-analyzer-requirements")
async def get_analyzer_requirements(
    analyzer_id: int,
    db: Session = Depends(get_db),
) -> str:
    return AnalyzerService.get_requirements(db=db, analyzer_id=analyzer_id)


@router.post(
    "/{analyzer_id}/upload/requirements", operation_id="upload-analyzer-requirements"
)
async def upload_analyzer_requirements(
    analyzer_id: int,
    file: analyzer_schema.FileUpload,
    db: Session = Depends(get_db),
) -> str:
    return await AnalyzerService.upload_requirements(
        db=db, analyzer_id=analyzer_id, file=file
    )
