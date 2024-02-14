from typing import List
from fastapi import APIRouter, Depends
from services.batch_service import BatchService

from db.database import get_db

from schemas.batch_schema import BatchResponse, BatchStatsResponse

router = APIRouter(prefix="/api/v1/batches")


@router.get("/", operation_id="get-all-batches")
async def get_batches(db=Depends(get_db)) -> List[BatchResponse]:
    pass


@router.get("/{batch_id}", operation_id="get-batch")
async def get_batch(batch_id: int, db=Depends(get_db)) -> BatchResponse:
    pass


@router.get("/{batch_id}/stats", operation_id="get-batch-stats")
async def get_batch_stats(batch_id: int, db=Depends(get_db)) -> BatchStatsResponse:
    return BatchService.get_batch_stats(db=db, batch_id=batch_id)
