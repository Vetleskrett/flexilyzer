import enum


class BatchEnum(enum.Enum):
    STARTED = "STARTED"
    RUNNING = "RUNNING"
    FAILED = "FAILED"
    FINISHED = "FINISHED"


class ValueTypes(enum.Enum):
    str = "str"
    int = "int"
    bool = "bool"
    range = "range"


class ValueTypesMapping(enum.Enum):
    str = "str"
    int = "int"
    bool = "bool"
    range = "int"
