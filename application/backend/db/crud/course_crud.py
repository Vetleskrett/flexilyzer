from sqlalchemy.orm import Session

from db.models import Course, Assignment, Team


def get_courses(db: Session):
    """
    Retrieves all courses

    Parameters:
    - db (Session)

    Returns:
    A list of all courses
    """
    return db.query(Course).all()


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


def get_course_teams(db: Session, course_id: int):
    """
    Retrieves all assignments for a specific course.

    Parameters:
    - db (Session): The database session.
    - course_id (int): The ID of the course.

    Returns:
    A list of assignments for the specified course.
    """
    return db.query(Team).filter(Team.course_id == course_id).all()


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
