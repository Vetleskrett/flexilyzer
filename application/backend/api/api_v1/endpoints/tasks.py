from fastapi import APIRouter
from backend.celery.task import celery_task

router = APIRouter(prefix="/api/v1/tasks")

@router.post("/run_task/")
async def run_task(param: int):
    celery_task.apply_async(args=[param])
    return {"message": "Task started"}


