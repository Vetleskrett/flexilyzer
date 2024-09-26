from pydantic_settings import BaseSettings
from enum import Enum, auto


class Environments(Enum):
    DEV = auto()
    PROD = auto()


class Base(BaseSettings):
    ENVIRONMENT: Environments = Environments.DEV


class Settings(Base):
    CELERY_BROKER_URL: str
    DATABASE_URL: str
    BASE_DIR: str = "./files/"
    SCRIPTS_FOLDER: str = "shared/scripts"
    DELIVERIES_FOLDER: str = "shared/deliveries"
    OUTPUT_FILES_FOLDER: str = "shared/output_files"
    DEFAULT_SCRIPT_NAME: str = "main.py"
    DEFAULT_REQUIREMENTS_NAME: str = "requirements.txt"

    class Config:
        env_file = ".env" if Base().ENVIRONMENT == Environments.DEV else None


settings = Settings()
