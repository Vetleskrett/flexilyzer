from sqlalchemy.orm import Session

import models

from schemas.entities import (
    AssignmentBase,
)


def get_courses(db: Session):
    """
    Retrieves all courses

    Parameters:
    - db (Session)

    Returns:
    A list of all courses
    """
    return db.query(models.Course).all()


def get_course(db: Session, course_id: int):
    """
    Retrieves a specific course

    Parameters:
    - db (Session)
    - course_id: int

    Returns:
    The requested course if found, otherwise None
    """
    return db.query(models.Course).filter(models.Course.id == course_id).first()


def get_assignments(db: Session):
    """
    Retrieves all assignments.

    Parameters:
    - db (Session): The database session.

    Returns:
    A list of all assignments.
    """
    return db.query(models.Assignment).all()


def get_assignment(db: Session, assignment_id: int):
    """
    Retrieves a specific assignment.

    Parameters:
    - db (Session): The database session.
    - assignment_id (int): The ID of the assignment.

    Returns:
    The requested assignment if found, otherwise None.
    """
    return (
        db.query(models.Assignment)
        .filter(models.Assignment.id == assignment_id)
        .first()
    )


def get_course_assignments(db: Session, course_id: int):
    """
    Retrieves all assignments for a specific course.

    Parameters:
    - db (Session): The database session.
    - course_id (int): The ID of the course.

    Returns:
    A list of assignments for the specified course.
    """
    return (
        db.query(models.Assignment)
        .filter(models.Assignment.course_id == course_id)
        .all()
    )


def get_assignment_repositories(db: Session, assignment_id: int):
    """
    Retrieves all repositories for a specific assignment

    Parameters:
    - db (Session): The database session
    - assignment_id: The ID of the assignment

    Returns:
    A list of repositories for the specified assignment.
    """
    return db.query(models.Repository).filter(models.Repository == assignment_id)


def get_assignment_repos_with_reports(db: Session, assignment_id: int):
    """
    Retrieves all repos for a specific assignment, including their reports.

    Parameters:
    - db (Session): The database session.
    - assignment_id (int): The ID of the assignment.

    Returns:
    A list of repos, each with their associated reports, for the specified assignment.
    """
    repos = (
        db.query(models.Repository)
        .filter(models.Repository.assignment_id == assignment_id)
        .all()
    )
    for repo in repos:
        repo.reports = (
            db.query(models.Report).filter(models.Report.repository_id == repo.id).all()
        )
    return repos


def get_analyzers(db: Session):
    """
    Retrieves all analyzers.

    Parameters:
    - db (Session): The database session.

    Returns:
    A list of all analyzers.
    """
    return db.query(models.Analyzer).all()


def get_analyzer(db: Session, analyzer_id: int):
    """
    Retrieves a specific analyzer.

    Parameters:
    - db (Session): The database session.
    - analyzer_id (int): The ID of the analyzer.

    Returns:
    The requested analyzer if found, otherwise None.
    """
    return db.query(models.Analyzer).filter(models.Analyzer.id == analyzer_id).first()


def get_analyzer_with_metrics_definitions(db: Session, analyzer_id: int):
    """
    Retrieves a specific analyzer along with its metric definitions.

    Parameters:
    - db (Session): The database session.
    - analyzer_id (int): The ID of the analyzer.

    Returns:
    The requested analyzer with its associated metric definitions if found, otherwise None.
    """
    analyzer = (
        db.query(models.Analyzer).filter(models.Analyzer.id == analyzer_id).first()
    )
    if analyzer:
        analyzer.metric_definitions = (
            db.query(models.MetricDefinition)
            .filter(models.MetricDefinition.analyzer_id == analyzer.id)
            .all()
        )
    return analyzer


def get_assignment_analyzers(db: Session, assignment_id: int):
    """
    Retrieves all analyzers for a specific assignment.

    Parameters:
    - db (Session): The database session.
    - assignment_id (int): The ID of the assignment.

    Returns:
    A list of analyzers for the specified assignment.
    """
    assignment = (
        db.query(models.Assignment)
        .filter(models.Assignment.id == assignment_id)
        .first()
    )
    if assignment:
        return assignment.analyzers
    return []
