from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
from schemas.shared import BatchEnum


class BatchBase(BaseModel):
    assignment_id: int
    analyzer_id: int


# Create models
class BatchCreate(BatchBase):
    pass


class BatchResponse(BatchBase):
    id: int
    status: BatchEnum
    timestamp: datetime

    class Config:
        from_attributes = True
