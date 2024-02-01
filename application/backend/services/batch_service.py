from fastapi import HTTPException
from services.analyzers_service import AnalyzerService
from services.assignments_service import AssignmentService
from db.crud.batches_crud import BatchesRepository


class BatchService:
    @staticmethod
    def get_batches(db):
        return BatchesRepository.get_batches(db=db)

    @staticmethod
    def get_batch(db, batch_id: int):
        batch = BatchesRepository.get_batch(db=db, batch_id=batch_id)
        if not batch:
            raise HTTPException(
                status_code=404, detail=f"Batch with id {batch_id} not found"
            )
        return batch

    @staticmethod
    def get_assignment_analyzers_batches(db, analyzer_id, assignemnt_id):
        AnalyzerService.get_analyzer(db=db, analyzer_id=analyzer_id)
        AssignmentService.get_assignment(db=db, assignment_id=assignemnt_id)

        return BatchesRepository.get_batch_by_assignment_and_analyzer(
            db, assignemnt_id=assignemnt_id, analyzer_id=analyzer_id
        )
