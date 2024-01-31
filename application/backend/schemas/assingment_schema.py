from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional


class AssignmentBase(BaseModel):
    name: str
    due_date: Optional[datetime] = None
    course_id: int


class AssignmentCreate(AssignmentBase):
    pass


class AssignmentResponse(AssignmentBase):
    id: int

    class Config:
        from_attributes = True
