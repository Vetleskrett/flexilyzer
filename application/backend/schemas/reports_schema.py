from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
from pydantic import Json


class ReportBase(BaseModel):
    timestamp: datetime
    report: Optional[Json] = None
    analyzer_id: int
    project_id: int


class ReportCreate(ReportBase):
    pass


class ReportResponse(ReportBase):
    id: int

    class config:
        from_attributes = True
