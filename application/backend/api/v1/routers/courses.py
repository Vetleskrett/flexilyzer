from typing import List, Optional
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from schemas import course_schema, assingment_schema, team_schema

from services.courses_service import CourseService
from db.database import get_db


router = APIRouter(prefix="/api/v1/courses")


@router.get("/", operation_id="get-all-courses")
async def get_courses(db=Depends(get_db)) -> List[course_schema.CourseResponse]:
    return CourseService.get_courses(db)


@router.post("/", operation_id="post-course")
async def post_course() -> List[course_schema.CourseResponse]:
    pass


@router.get("/{id}", operation_id="get-course")
async def get_course(id: int, db=Depends(get_db)) -> course_schema.CourseResponse:
    return CourseService.get_course(db, id)


@router.get("/{id}/assignments/", operation_id="get-course-assignments")
async def get_course_assignments(
    id: int, db=Depends(get_db)
) -> List[assingment_schema.AssignmentResponse]:
    return CourseService.get_course_assingments(db, id)


@router.get("/{id}/teams/", operation_id="get-course-teams")
async def get_courses_teams(
    id: int, db=Depends(get_db)
) -> List[team_schema.TeamResponse]:
    return CourseService.get_course_teams(db, id)


# @router.get("/{course_id}/assignments", operation_id="get-course-assignments")
# async def get_course_assignments(course_id: int):
#     assignments = select(a for a in Assignment if a.course.id == course_id)[:]
#     return [assignment.to_dict() for assignment in assignments]


# @router.post("/create", operation_id="create-course")
# async def create_course(param):
#     return {"message": "Task started"}
