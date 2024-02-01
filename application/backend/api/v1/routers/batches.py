from typing import List
from fastapi import APIRouter, Depends

from db.database import get_db

from schemas.batch_schema import BatchReponse

router = APIRouter(prefix="/api/v1/batches")


@router.get("/", operation_id="get-all-batches")
async def get_batches(db=Depends(get_db)) -> List[BatchReponse]:
    pass


@router.get("/{batch_id}", operation_id="get-batch")
async def get_batches(batch_id: int, db=Depends(get_db)) -> BatchReponse:
    pass
