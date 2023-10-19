from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
from pydantic import Json


# Base models
class CourseBase(BaseModel):
    tag: str
    name: Optional[str] = None


class AssignmentBase(BaseModel):
    name: str
    due_date: Optional[datetime] = None


class TeamBase(BaseModel):
    github_link: Optional[str] = None
    blackboard_link: Optional[str] = None


class RepositoryBase(BaseModel):
    github_link: Optional[str] = None


# Create models
class CourseCreate(CourseBase):
    pass


class AssignmentCreate(AssignmentBase):
    pass


class TeamCreate(TeamBase):
    pass


class RepositoryCreate(RepositoryBase):
    pass


# Response models
class CourseResponse(CourseBase):
    id: int


class AssignmentResponse(AssignmentBase):
    course: CourseResponse


class TeamResponse(TeamBase):
    id: int
    course: CourseResponse


class RepositoryResponse(RepositoryBase):
    id: int
    assignment: AssignmentResponse
    team: TeamResponse
