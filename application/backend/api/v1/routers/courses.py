from typing import List
from fastapi import APIRouter, Depends
from fastapi.responses import FileResponse
from schemas import course_schema, assingment_schema, team_schema

from services.courses_service import CourseService
from services.batch_service import BatchService
from db.database import get_db


router = APIRouter(prefix="/api/v1/courses")


@router.get("/", operation_id="get-all-courses")
async def get_courses(db=Depends(get_db)) -> List[course_schema.CourseResponse]:
    return CourseService.get_courses(db=db)


@router.post("/", operation_id="post-course")
async def post_course(course: course_schema.CourseCreate, db=Depends(get_db)):
    return CourseService.post_course(db=db, course=course)


@router.put("/{course_id}", operation_id="put-course")
async def put_course(
    course_id: int, course: course_schema.CourseCreate, db=Depends(get_db)
) -> course_schema.CourseResponse:
    return CourseService.put_course(db=db, course_id=course_id, course=course)


@router.get("/{course_id}", operation_id="get-course")
async def get_course(
    course_id: int, db=Depends(get_db)
) -> course_schema.CourseResponse:
    return CourseService.get_course(db, course_id)


@router.delete("/{course_id}", operation_id="delete-course")
async def delete_course(
    course_id: int, db=Depends(get_db)
) -> course_schema.CourseResponse:
    return CourseService.delete_course(db, course_id)


@router.get("/{course_id}/assignments/", operation_id="get-course-assignments")
async def get_course_assignments(
    course_id: int, db=Depends(get_db)
) -> List[assingment_schema.AssignmentResponse]:
    return CourseService.get_course_assingments(db, course_id)


@router.get("/{course_id}/teams/", operation_id="get-course-teams")
async def get_courses_teams(
    course_id: int, db=Depends(get_db)
) -> List[team_schema.TeamResponse]:
    return CourseService.get_course_teams(db, course_id)

@router.get(
    "/{course_id}/assignments/{assignment_id}/teams/{team_id}/projects/reports/batch/{batch_id}/{key_name}",
    operation_id="get-assignment-projects-reports-batch-file",
    response_class=FileResponse
)
def get_assignment_team_projects_report_batch_file(
    assignment_id: int,
    course_id: int,
    team_id: int,
    batch_id: int,
    key_name: str,
    db=Depends(get_db)
):
    return BatchService.get_assignment_team_projects_reports_batch_file(
        db=db,
        course_id=course_id,
        assignment_id=assignment_id,
        team_id=team_id,
        batch_id=batch_id,
        key_name=key_name
    )