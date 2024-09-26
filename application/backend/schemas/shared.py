from datetime import datetime
import enum
from typing import Optional

from pydantic import BaseModel


class BatchEnum(enum.Enum):
    STARTED = "STARTED"
    RUNNING = "RUNNING"
    FAILED = "FAILED"
    FINISHED = "FINISHED"


class ValueTypesInput(enum.Enum):
    str = "str"
    int = "int"
    bool = "bool"
    zip = "zip"


class ValueTypesOutput(enum.Enum):
    str = "str"
    int = "int"
    bool = "bool"
    range = "range"
    date = "date"
    file = "file"


class ValueTypesMapping(enum.Enum):
    str = "str"
    int = "int"
    bool = "bool"
    range = "int"
    date = "datetime"
    zip = "Path"
    file = "str"


class ExtendedTypeMappings(enum.Enum):
    str = "ExtendedStr"
    bool = "ExtendedBool"
    int = "ExtendedInt"
    datetime = "ExtendedDatetime"



class ExtendedBool(BaseModel):
    value: Optional[bool]
    desc: Optional[str]

class ExtendedInt(BaseModel):
    value: Optional[int]
    desc: Optional[str]

class ExtendedStr(BaseModel):
    value: Optional[str]
    desc: Optional[str]

class ExtendedDatetime(BaseModel):
    value: Optional[datetime]
    desc: Optional[str]