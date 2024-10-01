from pydantic import BaseModel, ValidationError, validator
from datetime import datetime
from typing import List, Optional, Dict
from pydantic import Json
from sqlalchemy import true


class JobBase(BaseModel):
    assignment_id: int
    project_ids: Optional[List[int]] = None


class JobResponse(JobBase):
    id: int


class JobCreate(JobBase):
    run_input: Optional[Dict] = None
