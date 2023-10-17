from fastapi import APIRouter
from celery_app.task import celery_task

router = APIRouter(prefix="/api/v1/tasks")


@router.get("/hello-task")
async def hello_world():
    return {"hello": "task"}

@router.post("/run_task/")
async def run_task(param: int):


    # celery_task.apply_async(args=[param])
    return {"message": "Task started"}


