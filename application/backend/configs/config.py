from pydantic import BaseModel
from pydantic_settings import BaseSettings



class Settings(BaseSettings):
    CELERY_BROKER_URL: str

    class Config:
        env_file = ".env"

settings = Settings()

