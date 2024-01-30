from typing import List
from sqlalchemy.orm import Session
from schemas.analyzer_schema import (
    AnalyzerBase,
    AnalyzerInputCreate,
    AnalyzerOutputCreate,
)

from db.models import Analyzer, AnalyzerInput, AnalyzerOutput


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
    def get_analyzer_inputs(db: Session, analyzer_id: int):
        """
        Retrieves a specific analyzer along with its inputs and outputs.

        Parameters:
        - db (Session): The database session.
        - analyzer_id (int): The ID of the analyzer.

        Returns:
        The requested analyzer inputs
        """
        return (
            db.query(AnalyzerInput)
            .filter(AnalyzerInput.analyzer_id == analyzer_id)
            .all()
        )

    @staticmethod
    def get_analyzer_outputs(db: Session, analyzer_id: int):
        """
        Retrieves a specific analyzer along with its inputs and outputs.

        Parameters:
        - db (Session): The database session.
        - analyzer_id (int): The ID of the analyzer.

        Returns:
        The requested analyzer outputs
        """
        return (
            db.query(AnalyzerOutput)
            .filter(AnalyzerOutput.analyzer_id == analyzer_id)
            .all()
        )

    @staticmethod
    def create_analyzer(db: Session, analyzer: AnalyzerBase):
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

    @staticmethod
    def create_analyzer_inputs(
        db: Session, analyzer_id: int, inputs: List[AnalyzerInputCreate]
    ):
        """
        Creates analyzer inputs.

        Parameters:
        - db (Session): The database session.
        - analyzer_id (int): The ID of the analyzer to which the inputs belong.
        - inputs (List[AnalyzerInputCreate]): A list of inputs to be created.

        Returns:
        A list of created analyzer inputs.
        """
        for input_data in inputs:
            new_input = AnalyzerInput(
                analyzer_id=analyzer_id, **input_data.model_dump()
            )
            db.add(new_input)
        db.commit()
        return (
            db.query(AnalyzerInput)
            .filter(AnalyzerInput.analyzer_id == analyzer_id)
            .all()
        )

    @staticmethod
    def create_analyzer_outputs(
        db: Session, analyzer_id: int, outputs: List[AnalyzerOutputCreate]
    ):
        """
        Creates analyzer outputs.

        Parameters:
        - db (Session): The database session.
        - analyzer_id (int): The ID of the analyzer to which the outputs belong.
        - outputs (List[AnalyzerOutputCreate]): A list of outputs to be created.

        Returns:
        A list of created analyzer outputs.
        """
        for output_data in outputs:
            new_output = AnalyzerOutput(
                analyzer_id=analyzer_id, **output_data.model_dump()
            )
            db.add(new_output)
        db.commit()
        return (
            db.query(AnalyzerOutput)
            .filter(AnalyzerOutput.analyzer_id == analyzer_id)
            .all()
        )
