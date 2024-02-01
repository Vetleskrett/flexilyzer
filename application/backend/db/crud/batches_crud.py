from typing import List
from sqlalchemy.orm import Session


from db.models import Batch
from schemas.shared import BatchEnum
from schemas.batch_schema import BatchCreate


class BatchesRepository:
    @staticmethod
    def get_batches(db: Session):
        """
        Retrieves all batches.

        Parameters:
        - db (Session): The database session.

        Returns:
        A list of all batches.
        """
        return db.query(Batch).all()

    @staticmethod
    def get_batch(db: Session, batch_id: int):
        """
        Retrives a specific batch .

        Parameters:
        - db (Session): The database session.
        - batch_id (int): The ID of the batch.

        Returns:
        the batch with updated status.
        """
        return db.query(Batch).filter(Batch.id == batch_id).first()

    @staticmethod
    def update_batch_status(db: Session, batch_id: int, status: BatchEnum):
        """
        Updates batch status.

        Parameters:
        - db (Session): The database session.
        - batch_id (int): The ID of the batch.
        - status (BatchEnum): new status of the batch

        Returns:
        the batch with updated status.
        """
        db.query(Batch).filter(Batch.id == batch_id).update({Batch.status: status})
        db.commit()
        return db.query(Batch).filter(Batch.id == batch_id).first()

    @staticmethod
    def create_batch(db: Session, batch: BatchCreate):
        """
        Create a new batch.

        Parameters:
        - db (Session): The database session.
        - batch (BatchCreate): The batch data.

        Returns:
        The created course.
        """
        db_batch = Batch(**batch.model_dump())
        db.add(db_batch)
        db.commit()
        db.refresh(db_batch)
        return db_batch

    @staticmethod
    def get_batch_by_assignment_and_analyzer(db: Session, assignemnt_id, analyzer_id):
        return (
            db.query(Batch)
            .filter(
                Batch.analyzer_id == analyzer_id, Batch.assignment_id == assignemnt_id
            )
            .all()
        )
