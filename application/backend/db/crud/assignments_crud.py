from sqlalchemy.orm import Session, aliased
from sqlalchemy import and_
from db.models import Assignment, Repository, Report, Team
from schemas import assingment_schema


def get_assignments(db: Session):
    """
    Retrieves all assignments.

    Parameters:
    - db (Session): The database session.

    Returns:
    A list of all assignments.
    """
    return db.query(Assignment).all()


def get_assignment(db: Session, assignment_id: int):
    """
    Retrieves a specific assignment.

    Parameters:
    - db (Session): The database session.
    - assignment_id (int): The ID of the assignment.

    Returns:
    The requested assignment if found, otherwise None.
    """
    return db.query(Assignment).filter(Assignment.id == assignment_id).first()


def get_assignment_repositories(db: Session, assignment_id: int):
    """
    Retrieves all repositories for a specific assignment

    Parameters:
    - db (Session): The database session
    - assignment_id: The ID of the assignment

    Returns:
    A list of repositories for the specified assignment.
    """
    return db.query(Repository).filter(Repository == assignment_id)


def create_assignment(db: Session, assignment: assingment_schema.AssignmentCreate):
    """
    Creates a new assignment record.

    Parameters:
    - db (Session): The database session
    - assignment (AssignmentCreate): A object containg the details of the assignment to be created

    Returns:
    The created assignment record.
    """
    db_assignment = Assignment(**assignment.model_dump())
    db.add(db_assignment)
    db.commit()
    db.refresh(db_assignment)
    return db_assignment


def get_assignment_team_repos_reports(db: Session, assignment_id: int, team_id: int):
    """
    Retrieves report IDs and report content for a specific assignment and team.

    Parameters:
    - db (Session): The database session.
    - assignment_id (int): The ID of the assignment.
    - team_id (int): The ID of the team.

    Returns:
    A query object containing report IDs and report content for the specified assignment and team.
    """

    report = aliased(Report)
    repository = aliased(Repository)
    team = aliased(Team)
    assignment = aliased(Assignment)

    return (
        db.query(report)
        .outerjoin(repository, report.repository_id == repository.id)
        .outerjoin(team, repository.team_id == team.id)
        .outerjoin(assignment, repository.assignment_id == assignment.id)
        .filter(and_(team.id == team_id, assignment.id == assignment_id))
        .all()
    )


# def get_assignment_analyzers(db: Session, assignment_id: int):
#     """
#     Retrieves all analyzers for a specific assignment.

#     Parameters:
#     - db (Session): The database session.
#     - assignment_id (int): The ID of the assignment.

#     Returns:
#     A list of analyzers for the specified assignment.
#     """
#     assignment = db.query(Assignment).filter(Assignment.id == assignment_id).first()
#     if assignment:
#         return assignment.analyzers
#     return []
