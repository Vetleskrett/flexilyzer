from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
from pydantic import Json
from models.entities import RepositoryResponse


class AnalyzerBase(BaseModel):
    name: str
    creator: Optional[str] = None


class MetricDefinitionBase(BaseModel):
    key_name: str
    value_type: str
    display_name: Optional[str] = None
    extended_metadata: Optional[Json] = None


class ReportBase(BaseModel):
    timestamp: datetime
    report: Optional[Json] = None


class AnalyzerCreate(AnalyzerBase):
    pass


class MetricDefinitionCreate(MetricDefinitionBase):
    pass


class ReportCreate(ReportBase):
    pass


class AnalyzerResponse(AnalyzerBase):
    id: int


class MetricDefinitionResponse(MetricDefinitionBase):
    id: int
    analyzer: AnalyzerResponse


class ReportResponse(ReportBase):
    id: int
    analyzer: AnalyzerResponse
    repository: RepositoryResponse
