import enum


class BatchEnum(enum.Enum):
    STARTED = "STARTED"
    RUNNING = "RUNNING"
    FAILED = "FAILED"
    FINISHED = "FINISHED"
