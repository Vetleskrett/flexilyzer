from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
from pydantic import Json


class CourseBase(BaseModel):
    tag: str
    name: Optional[str] = None


# Create models
class CourseCreate(CourseBase):
    pass


class CourseResponse(CourseBase):
    id: int

    class Config:
        from_attributes = True
