import enum


class VenvEnum(enum.Enum):
    HAS_VENV = "HAS_VENV"
    CREATING_VENV = "CREATING_VENV"
    FAILED_CREATING_VENV = "FAILED_CREATING_VENV"
    NO_VENV = "NO_VENV"


class BatchEnum(enum.Enum):
    STARTED = "STARTED"
    RUNNING = "RUNNING"
    FAILED = "FAILED"
    FINISHED = "FINISHED"
