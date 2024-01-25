from celery import Celery
from configs.config import settings

app = Celery("tasks", broker=settings.CELERY_BROKER_URL)
app.autodiscover_tasks(["celery_app.tasks"])
