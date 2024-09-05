from sqlalchemy.orm import Session
from db.models import Project, Report, ProjectMetadata
from schemas.project_schema import ProjectBase, ProjectMetadataBase

class ProjectRepository:
    @staticmethod
    def get_projects(db: Session):
        """
        Retrieves all projects

        Parameters:
        - db (Session)

        Returns:
        A list of all projects
        """
        return db.query(Project).all()

    @staticmethod
    def get_project(db: Session, project_id: int):
        """
        Retrieves a specific project

        Parameters:
        - db (Session)
        - project_id: int

        Returns:
        The requested project if found, otherwise None
        """
        return db.query(Project).filter(Project.id == project_id).first()

    @staticmethod
    def delete_project(db: Session, project_id: int):
        return db.query(Project).filter(Project.id == project_id).delete()


    @staticmethod
    def create_project(db: Session, project: ProjectBase):
        """
        Creates a new project record.

        Parameters:
        - db (Session): The database session
        - project (ProjectCreate): A object containg the details of the project to be created

        Returns:
        The created project record.
        """
        db_project = Project(**project.model_dump())
        db.add(db_project)
        db.commit()
        db.refresh(db_project)
        return db_project
    
    @staticmethod
    def create_project_metadata(db: Session, project_metadata: ProjectMetadataBase):
        """
        Creates a new project metadata record.

        Parameters:
        - db (Session): The database session
        - project_metadata (ProjectMetadataCreate): A object containg the details of the project metadata to be created

        Returns:
        The created project metadata record.
        """
        db_project_metadata = ProjectMetadata(**project_metadata.model_dump())
        db.add(db_project_metadata)
        db.commit()
        db.refresh(db_project_metadata)
        return db_project_metadata

    @staticmethod
    def get_project_reports(db: Session, project_id: int):
        """
        Retrives all reports for the specified project

        Parameters:
        - db (Session)
        - project_id: int

        Returns:
        List with all reports for the specified project
        """
        return db.query(Report).filter(Report.project_id == project_id).all()

    @staticmethod
    def get_project_metadata_for_project(db: Session, project_id):
        return (
            db.query(ProjectMetadata)
            .filter(ProjectMetadata.project_id == project_id)
            .all()
        )

    @staticmethod
    def get_project_ids_by_assignment_id(db: Session, assignment_id: int):
        return db.query(Project.id).filter(Project.assignment_id == assignment_id).all()
