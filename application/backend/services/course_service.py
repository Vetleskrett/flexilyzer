from db.crud import course_crud


class CourseService:
    @staticmethod
    def get_courses(db):
        return course_crud.get_courses(db)

    def get_course(db, id):
        return course_crud.get_course(db, id)

    def get_course_assingments(db, course_id):
        # exmple of how one could early validate params
        course = CourseService.get_course(db, course_id)
        if not course:
            return None

        return course_crud.get_course_assignments(db, course_id)

    def get_course_teams(db, course_id):
        return course_crud.get_course_teams(db, course_id)
