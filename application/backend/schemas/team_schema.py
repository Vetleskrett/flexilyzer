from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
from pydantic import Json


class TeamBase(BaseModel):
    github_team_link: Optional[str] = None
    blackboard_link: Optional[str] = None


class TeamCreate(TeamBase):
    pass


class TeamResponse(TeamBase):
    id: int

    class Config:
        from_attributes = True
