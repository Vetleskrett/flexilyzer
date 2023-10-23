from sqlalchemy.orm import Session

from db.models import Assignment, Repository
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
