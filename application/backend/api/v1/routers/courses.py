from typing import Optional
from fastapi import APIRouter
from pydantic import BaseModel
from main import prisma

router = APIRouter(prefix="/api/v1/courses")

class CourseData(BaseModel):
    tag: str
    name: str


@router.get("/", operation_id="get-all-courses")
async def get_all_courses():
    courses = await prisma.course.find_many()
    return {"courses": courses}


@router.post("/create", operation_id="create-course")
async def create_course(param: CourseData):
    course = await prisma.course.create(data={param})

    return {"message": "Task started"}
