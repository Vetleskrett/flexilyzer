from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
from pydantic import Json


class ProjectBase(BaseModel):
    github_link: Optional[str] = None
    team_id: int
    assignment_id: int


class ProjectCreate(ProjectBase):
    pass


class ProjectResponse(ProjectBase):
    id: int

    class Config:
        from_attributes = True
