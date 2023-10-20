from db.crud import assignments_crud
from fastapi import HTTPException


class AssingmentService:
    @staticmethod
    def get_assignments(db):
        return assignments_crud.get_assignments(db)

    @staticmethod
    def get_assignment(db, assignment_id):
        assignemnt = assignments_crud.get_assignment(db, assignment_id)
        if assignemnt is None:
            raise HTTPException(status_code=404, detail="Assignment not found")
        return assignemnt

    @staticmethod
    def get_assignment_repositories(db, assignment_id):
        assignment = AssingmentService.get_assignment(db, assignment_id)

        if assignment:
            return assignments_crud.get_assignment_repositories(db, assignment_id)
