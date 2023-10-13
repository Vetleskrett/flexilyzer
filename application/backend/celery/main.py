from celery import Celery
from backend.configs.config import settings


app = Celery("tasks", broker=settings.CELERY_BROKER_URL)



