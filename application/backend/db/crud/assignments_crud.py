from sqlalchemy.orm import Session, aliased
from sqlalchemy import and_
from db.models import (
    Assignment,
    AssignmentMetadata,
    Batch,
    Project,
    Report,
    Team,
    assignment_analyzer_association,
)
from schemas import assingment_schema


class AssignmentRepository:
    @staticmethod
    def get_assignments(db: Session):
        """
        Retrieves all assignments.

        Parameters:
        - db (Session): The database session.

        Returns:
        A list of all assignments.
        """
        return db.query(Assignment).all()

    @staticmethod
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

    @staticmethod
    def get_assignment_projects(db: Session, assignment_id: int):
        """
        Retrieves all projects for a specific assignment

        Parameters:
        - db (Session): The database session
        - assignment_id: The ID of the assignment

        Returns:
        A list of projects for the specified assignment.
        """
        return db.query(Project).filter(Project.assignment_id == assignment_id)

    @staticmethod
    def create_assignment(db: Session, assignment: assingment_schema.AssignmentBase):
        """
        Creates a new assignment record.

        Parameters:
        - db (Session): The database session
        - assignment (AssignmentBase): A object containg the details of the assignment to be created

        Returns:
        The created assignment record.
        """
        db_assignment = Assignment(**assignment.model_dump())
        db.add(db_assignment)
        db.commit()
        db.refresh(db_assignment)
        return db_assignment
    
    @staticmethod
    def create_assignment_metadata(db: Session, assignment_metadata: assingment_schema.AssignmentMetadataBase):
        """
        Creates a new assignment metadata record.

        Parameters:
        - db (Session): The database session
        - assignment (AssignmentMetadataBase): A object containg the details of the assignment to be created

        Returns:
        The created assignment metadata record.
        """
        db_assignment_metadata = AssignmentMetadata(**assignment_metadata.model_dump())
        db.add(db_assignment_metadata)
        db.commit()
        db.refresh(db_assignment_metadata)
        return db_assignment_metadata

    @staticmethod
    def get_assignment_team_project(
        db: Session, assignment_id: int, team_id: int
    ):

        return (
            db.query(Project)
            .filter(Project.assignment_id == assignment_id, Project.team_id == team_id)
            .first()
        )

    @staticmethod
    def get_assignment_team_projects_reports(
        db: Session, assignment_id: int, team_id: int
    ):
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
        project = aliased(Project)
        team = aliased(Team)
        assignment = aliased(Assignment)

        return (
            db.query(report)
            .outerjoin(project, report.project_id == project.id)
            .outerjoin(team, project.team_id == team.id)
            .outerjoin(assignment, project.assignment_id == assignment.id)
            .filter(and_(team.id == team_id, assignment.id == assignment_id))
            .all()
        )

    @staticmethod
    def get_assignment_team_projects_reports_batch(
        db: Session, assignment_id: int, team_id: int, batch_id: int
    ):
        """
        Retrieves report ID and report content for a specific assignment, team and batch.

        Parameters:
        - db (Session): The database session.
        - assignment_id (int): The ID of the assignment.
        - team_id (int): The ID of the team.
        - batch_id (int): The ID of the desired report.

        Returns:
        A query object containing report ID and report content for the specified assignment, team and batch.
        """

        report = aliased(Report)
        project = aliased(Project)
        team = aliased(Team)
        assignment = aliased(Assignment)
        batch = aliased(Batch)

        return (
            db.query(report)
            .outerjoin(project, report.project_id == project.id)
            .outerjoin(team, project.team_id == team.id)
            .outerjoin(assignment, project.assignment_id == assignment.id)
            .outerjoin(batch, report.batch_id == batch.id)
            .filter(
                and_(
                    team.id == team_id,
                    assignment.id == assignment_id,
                    batch.id == batch_id,
                )
            )
            .first()
        )

    @staticmethod
    def get_assignment_metadata_for_assignment(db: Session, assignment_id):
        return (
            db.query(AssignmentMetadata)
            .filter(AssignmentMetadata.assignment_id == assignment_id)
            .all()
        )

    @staticmethod
    def connect_assignment_analyzer(db: Session, assignment_id: int, analyzer_id: int):
        """
        Connects an assignment to an analyzer by updating the association table.

        Parameters:
        - db (Session): The database session.
        - assignment_id (int): The ID of the assignment to be connected.
        - analyzer_id (int): The ID of the analyzer to be connected.

        Returns:
        None. The function updates the database directly.
        """

        # Check if the connection already exists to avoid duplicates
        existing_connection = (
            db.query(assignment_analyzer_association)
            .filter_by(assignment_id=assignment_id, analyzer_id=analyzer_id)
            .first()
        )

        if existing_connection:
            # fix for later
            return

        new_connection = assignment_analyzer_association.insert().values(
            assignment_id=assignment_id, analyzer_id=analyzer_id
        )
        db.execute(new_connection)
        db.commit()

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
