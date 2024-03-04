import enum


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


class ValueTypesMapping(enum.Enum):
    str = "str"
    int = "int"
    bool = "bool"
    range = "int"
    date = "datetime"
    zip = "Path"


class ExtendedTypeMappings(enum.Enum):
    str = "ExtendedStr"
    bool = "ExtendedBool"
    int = "ExtendedInt"
    datetime = "ExtendedDatetime"
