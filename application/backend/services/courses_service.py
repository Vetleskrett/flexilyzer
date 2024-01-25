from schemas import course_schema, assingment_schema
from db.crud import assignments_crud
from db.crud.course_crud import CourseRepository
from fastapi import HTTPException
from sqlalchemy.orm import Session


class CourseService:
    @staticmethod
    def get_courses(db: Session):
        return CourseRepository.get_courses(db=db)

    @staticmethod
    def get_course(db: Session, course_id: int):
        course = CourseRepository.get_course(db=db, course_id=course_id)
        if not course:
            raise HTTPException(
                status_code=404, detail=f"Course with id {course_id} not found"
            )
        return course

    @staticmethod
    def get_course_assingments(db: Session, course_id: int):
        CourseService.get_course(db=db, course_id=course_id)

        return CourseRepository.get_course_assignments(db, course_id)

    @staticmethod
    def get_course_teams(db: Session, course_id: int):
        CourseService.get_course(db=db, course_id=course_id)

        return CourseRepository.get_course_teams(db=db, course_id=course_id)

    @staticmethod
    def post_course(db: Session, course: course_schema.CourseCreate):
        return CourseRepository.create_course(db=db, course=course)

    @staticmethod
    def put_course(db: Session, course_id: int, course: course_schema.CourseCreate):
        CourseService.get_course(db=db, course_id=course_id)

        return CourseRepository.update_course(db=db, course_id=course_id, course=course)

    @staticmethod
    def delete_course(db: Session, course_id: int):
        CourseService.get_course(db=db, course_id=course_id)

        return CourseRepository.delete_course(db=db, course_id=course_id)
