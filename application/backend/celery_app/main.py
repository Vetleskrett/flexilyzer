from celery import Celery
from configs.config import settings


print(settings.CELERY_BROKER_URL)
app = Celery("tasks", broker=settings.CELERY_BROKER_URL)



