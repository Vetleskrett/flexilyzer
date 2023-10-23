from db.crud import assignments_crud
from schemas import assingment_schema
from fastapi import HTTPException
from sqlalchemy.orm import Session

from services.courses_service import CourseService


class AssingmentService:
    @staticmethod
    def get_assignments(db):
        return assignments_crud.get_assignments(db)

    @staticmethod
    def get_assignment(db, assignment_id):
        assignemnt = assignments_crud.get_assignment(db, assignment_id)
        if assignemnt is None:
            raise HTTPException(status_code=404, detail="Assignment not found")
        return assignemnt

    @staticmethod
    def get_assignment_repositories(db, assignment_id):
        AssingmentService.get_assignment(db, assignment_id)

        return assignments_crud.get_assignment_repositories(db, assignment_id)

    @staticmethod
    def create_assignment(db: Session, assignment: assingment_schema.AssignmentCreate):
        course_id = assignment.course_id
        CourseService.get_course(db=db, course_id=course_id)

        return assignments_crud.create_assignment(db=db, assignment=assignment)
