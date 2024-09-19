from pydantic import BaseModel, validator
from typing import List, Optional
from pydantic import Json
from schemas.shared import ValueTypesInput, ValueTypesOutput


class AnalyzerOutputBase(BaseModel):
    key_name: str
    value_type: ValueTypesOutput
    display_name: Optional[str] = None
    extended_metadata: Optional[Json] = None


class AnalyzerInputBase(BaseModel):
    key_name: str
    value_type: ValueTypesInput


class AnalyzerOutputCreate(AnalyzerOutputBase):
    pass


class AnalyzerInputCreate(AnalyzerInputBase):
    pass


class AnalyzerBase(BaseModel):
    name: str
    description: str
    creator: Optional[str] = None


class AnalyzerInternalUpdate(AnalyzerBase):
    id: int
    has_script: Optional[bool] = None
    has_requirements: Optional[bool] = None

    class Config:
        from_attributes: True


class AnalyzerSimplifiedResponse(AnalyzerBase):
    id: int
    has_script: Optional[bool] = None
    has_requirements: Optional[bool] = None

    class Config:
        from_attributes: True


class AnalyzerCreate(AnalyzerBase):
    inputs: List[AnalyzerInputCreate]
    outputs: List[AnalyzerOutputCreate]


class AnalyzerOutputResponse(AnalyzerOutputBase):
    id: int

    class Config:
        from_attributes: True


class AnalyzerInputResponse(AnalyzerInputBase):
    id: int

    class Config:
        from_attributes: True


class AnalyzerResponse(AnalyzerBase):
    id: int
    has_script: Optional[bool] = None
    has_venv: Optional[bool] = None
    inputs: List[AnalyzerInputResponse]
    outputs: List[AnalyzerOutputResponse]

    class Config:
        from_attributes: True


class FileUpload(BaseModel):
    text: str
