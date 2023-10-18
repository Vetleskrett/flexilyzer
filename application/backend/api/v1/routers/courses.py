from typing import Optional
from fastapi import APIRouter
from pydantic import BaseModel

from db.session import db

from db.models import (
    Course,
    Assignment,
    Group,
    Repository,
    Analyzer,
    MetricDefinition,
    Report,
)

from pony.orm import select

db.generate_mapping(create_tables=True)

router = APIRouter(prefix="/api/v1/courses")


@router.get("/", operation_id="get-all-courses")
async def get_all_courses():
    courses = [
        {"id": course.id, "tag_name": course.tag + " " + course.name}
        for course in Course.select()
    ]
    # courses = [course.to_dict() for course in Course.select()]
    print(courses)
    return courses


@router.post("/create", operation_id="create-course")
async def create_course(param):
    return {"message": "Task started"}
