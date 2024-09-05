from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
from pydantic import Json


class ProjectBase(BaseModel):
    team_id: int
    assignment_id: int


class ProjectMetadataCreate(BaseModel):
    value: str
    assignment_metadata_id: int


class ProjectCreate(ProjectBase):
    project_metadata: List[ProjectMetadataCreate]


class ProjectMetadataBase(BaseModel):
    value: str
    project_id: int
    assignment_metadata_id: int


class ProjectMetadataResponse(ProjectMetadataBase):
    id: int

    class Config:
        from_attributes = True


class ProjectResponse(ProjectBase):
    id: int
    project_metadata: List[ProjectMetadataResponse]

    class Config:
        from_attributes = True