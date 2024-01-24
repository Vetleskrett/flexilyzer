from pydantic import BaseModel, ValidationError, validator
from datetime import datetime
from typing import List, Optional
from pydantic import Json
from sqlalchemy import true


class JobBase(BaseModel):
    asssingment_id: int
    project_ids: Optional[List[int]] = None


class JobResponse(JobBase):
    id: int


class JobCreate(JobBase):
    pass
