from pydantic import BaseModel, ValidationError, validator
from datetime import datetime
from typing import List, Optional
from pydantic import Json
from sqlalchemy import true


class AnalyzerBase(BaseModel):
    name: str
    creator: Optional[str] = None


class MetricDefinitionBase(BaseModel):
    key_name: str
    value_type: str
    display_name: Optional[str] = None
    extended_metadata: Optional[Json] = None


class AnalyzerCreate(AnalyzerBase):
    pass


class MetricDefinitionCreate(MetricDefinitionBase):
    pass


class AnalyzerResponse(AnalyzerBase):
    id: int

    class Config:
        from_attributes: True


class MetricDefinitionResponse(MetricDefinitionBase):
    id: int
    analyzer_id: int


class ScriptSchema(BaseModel):
    file_name: str

    @validator("file_name")
    def validate_file_type(cls, file_name: str):
        valid_file_type = ".py"

        if not file_name.endswith(valid_file_type):
            raise ValueError(
                f"Unsuported file type, expected {valid_file_type} recived .{file_name.split('.')[-1]}"
            )

        if "/" in file_name or "\\" in file_name:
            raise ValueError("Invalid filename")

        return file_name


class RequirementsSchema(BaseModel):
    file_name: str

    @validator("file_name")
    def validate_file_type(cls, file_name: str):
        valid_file_name = "requirements"
        valid_file_type = ".txt"

        if file_name != valid_file_name + valid_file_type:
            raise ValueError(
                f"Unsuported requirements file, expected {valid_file_name + valid_file_type} recived {file_name}"
            )

        if "/" in file_name or "\\" in file_name:
            raise ValueError("Invalid filename")

        return file_name
