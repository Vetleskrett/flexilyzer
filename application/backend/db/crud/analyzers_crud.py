from sqlalchemy.orm import Session
from schemas import analyzer_schema

from db.models import Analyzer, MetricDefinition


class AnalyzerRepository:
    @staticmethod
    def get_analyzers(db: Session):
        """
        Retrieves all analyzers.

        Parameters:
        - db (Session): The database session.

        Returns:
        A list of all analyzers.
        """
        return db.query(Analyzer).all()

    @staticmethod
    def get_analyzer(db: Session, analyzer_id: int):
        """
        Retrieves a specific analyzer.

        Parameters:
        - db (Session): The database session.
        - analyzer_id (int): The ID of the analyzer.

        Returns:
        The requested analyzer if found, otherwise None.
        """
        return db.query(Analyzer).filter(Analyzer.id == analyzer_id).first()

    @staticmethod
    def get_analyzer_metric_definitions(db: Session, analyzer_id: int):
        """
        Retrieves a specific analyzer along with its metric definitions.

        Parameters:
        - db (Session): The database session.
        - analyzer_id (int): The ID of the analyzer.

        Returns:
        The requested analyzer with its associated metric definitions if found, otherwise None.
        """
        analyzer = db.query(Analyzer).filter(Analyzer.id == analyzer_id).first()
        if analyzer:
            analyzer.metric_definitions = (
                db.query(MetricDefinition)
                .filter(MetricDefinition.analyzer_id == analyzer.id)
                .all()
            )
        return analyzer

    @staticmethod
    def create_analyzer(db: Session, analyzer: analyzer_schema.AnalyzerCreate):
        """
        Creates a new analyzer.

        Parameters:
        - db (Session): The database session.
        - name (str): The name of the analyzer.
        - creator (str, optional): The creator of the analyzer. Defaults to None.

        Returns:
        The created analyzer.
        """
        # Create a new Analyzer object
        new_analyzer = Analyzer(**analyzer.model_dump())
        db.add(new_analyzer)
        db.commit()
        db.refresh(new_analyzer)

        return new_analyzer
