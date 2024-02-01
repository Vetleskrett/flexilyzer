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
    BASE_DIR: str
    DEFAULT_SCRIPT_NAME: str
    DEFAULT_VENV_NAME: str
    DEFAULT_REQUIREMENTS_NAME: str

    class Config:
        env_file = ".env" if Base().ENVIRONMENT == Environments.DEV else None


settings = Settings()
