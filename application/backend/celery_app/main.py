from celery import Celery
from configs.config import settings


app = Celery("tasks", broker=settings.CELERY_BROKER_URL)
