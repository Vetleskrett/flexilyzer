from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
from pydantic import Json


class RepositoryBase(BaseModel):
    github_link: Optional[str] = None


class RepositoryCreate(RepositoryBase):
    pass


class RepositoryResponse(RepositoryBase):
    id: int

    class Config:
        from_attributes = True
