from pydantic import BaseModel
from datetime import datetime
from typing import Dict, List, Optional
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


class BatchStatsResponse(BaseModel):
    id: int
    stats: Dict[str, Dict]


# {
#     "id": 1,
#     "stats": {
#         "total_code_lines": {"avg": 33},
#         "is_public": {"distribution": {"true": 59, "false": 41}},
#     },
# }
