from sqlalchemy.orm import Session

from db.models import Course, Assignment, Team
from schemas import course_schema


class CourseRepository:
    @staticmethod
    def get_courses(db: Session):
        """
        Retrieves all courses

        Parameters:
        - db (Session)

        Returns:
        A list of all courses
        """
        return db.query(Course).all()

    @staticmethod
    def get_course(db: Session, course_id: int):
        """
        Retrieves a specific course

        Parameters:
        - db (Session)
        - course_id: int

        Returns:
        The requested course if found, otherwise None
        """
        return db.query(Course).filter(Course.id == course_id).first()

    @staticmethod
    def get_course_assignments(db: Session, course_id: int):
        """
        Retrieves all assignments for a specific course.

        Parameters:
        - db (Session): The database session.
        - course_id (int): The ID of the course.

        Returns:
        A list of assignments for the specified course.
        """
        return db.query(Assignment).filter(Assignment.course_id == course_id).all()

    @staticmethod
    def get_course_teams(db: Session, course_id: int):
        """
        Retrieves all teams for a specific course.

        Parameters:
        - db (Session): The database session.
        - course_id (int): The ID of the course.

        Returns:
        A list of teams for the specified course.
        """
        return db.query(Team).filter(Team.course_id == course_id).all()

    @staticmethod
    def create_course(db: Session, course: course_schema.CourseCreate):
        """
        Create a new course.

        Parameters:
        - db (Session): The database session.
        - course (CourseCreate): The course data.

        Returns:
        The created course.
        """
        db_course = Course(**course.model_dump())
        db.add(db_course)
        db.commit()
        db.refresh(db_course)
        return db_course

    @staticmethod
    def update_course(db: Session, course_id: int, course: course_schema.CourseCreate):
        """
        Update an existing course.

        Parameters:
        - db (Session): The database session.
        - course_id (int): The course ID.
        - course (CourseCreate): The updated course data.

        Returns:
        The updated course.
        """
        db_course = db.query(Course).filter(Course.id == course_id).first()
        for key, value in course.model_dump().items():
            setattr(db_course, key, value)
        db.commit()
        db.refresh(db_course)
        return db_course

    @staticmethod
    def delete_course(db: Session, course_id: int):
        """
        Deletes a course by its ID.

        Parameters:
        - db (Session): The database session
        - course_id (int): The ID of the course to be deleted

        Returns:
        The deleted course record, or None if the course was not found.
        """
        db_course = db.query(Course).filter(Course.id == course_id).first()
        if db_course is None:
            return None
        db.delete(db_course)
        db.commit()
        return db_course


# def get_assignment_repos_with_reports(db: Session, assignment_id: int):
#     """
#     Retrieves all repos for a specific assignment, including their reports.

#     Parameters:
#     - db (Session): The database session.
#     - assignment_id (int): The ID of the assignment.

#     Returns:
#     A list of repos, each with their associated reports, for the specified assignment.
#     """
#     repos = (
#         db.query(models.Repository)
#         .filter(models.Repository.assignment_id == assignment_id)
#         .all()
#     )
#     for repo in repos:
#         repo.reports = (
#             db.query(models.Report).filter(models.Report.repository_id == repo.id).all()
#         )
#     return repos
