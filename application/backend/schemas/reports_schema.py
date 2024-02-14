from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
from pydantic import Json


class ReportBase(BaseModel):
    report: Json
    project_id: int
    batch_id: int


class ReportCreate(ReportBase):
    pass


class ReportResponse(ReportBase):
    id: int

    class config:
        from_attributes = True
