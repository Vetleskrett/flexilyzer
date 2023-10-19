from fastapi import APIRouter
# from celery_app.task import celery_task
from pydantic import BaseModel
from enum import Enum, auto

from main import prisma

course = prisma

router = APIRouter(prefix="/api/v1/tasks")

class testE(Enum):
    test = auto()
    test2 = auto()


class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None
    tags: list[str] = []


@router.get("/hello-task", operation_id="get-hello-task")
async def get_tasks() -> testE:
    
    if 1 == 2: 
        return testE.test
    return testE.test2


@router.post("/run_task/", operation_id="post-run-task")
async def run_task(param: int) -> list[Item]:


    # celery_task.apply_async(args=[param])
    return []


