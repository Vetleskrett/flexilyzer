from typing import Optional
from fastapi import APIRouter
from pydantic import BaseModel

from db.session import db

from db.models import (
    Course,
    Assignment,
)

from pony.orm import select

# Check if mapping is not yet generated
db.generate_mapping(create_tables=True)


router = APIRouter(prefix="/api/v1/courses")


@router.get("/", operation_id="get-all-courses")
async def get_all_courses():
    courses = [
        {"id": course.id, "tag_name": course.tag + " " + course.name}
        for course in Course.select()
    ]
    # courses = [course.to_dict() for course in Course.select()]
    return courses


@router.get("/{course_id}/assignments", operation_id="get-course-assignments")
async def get_course_assignments(course_id: int):
    assignments = select(a for a in Assignment if a.course.id == course_id)[:]
    return [assignment.to_dict() for assignment in assignments]


@router.post("/create", operation_id="create-course")
async def create_course(param):
    return {"message": "Task started"}
