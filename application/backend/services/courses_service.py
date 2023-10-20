from db.crud import course_crud
from fastapi import HTTPException


class CourseService:
    @staticmethod
    def get_courses(db):
        return course_crud.get_courses(db)

    @staticmethod
    def get_course(db, id):
        course = course_crud.get_course(db, id)
        if not course:
            raise HTTPException(status_code=404, detail="Course not found")
        return course

    @staticmethod
    def get_course_assingments(db, course_id):
        CourseService.get_course(db, course_id)

        return course_crud.get_course_assignments(db, course_id)

    @staticmethod
    def get_course_teams(db, course_id):
        CourseService.get_course(db, course_id)

        return course_crud.get_course_teams(db, course_id)
