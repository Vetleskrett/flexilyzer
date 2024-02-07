from typing import List
from db.crud.analyzers_crud import AnalyzerRepository
from db.crud.assignments_crud import AssignmentRepository
from schemas import assingment_schema
from fastapi import HTTPException
from sqlalchemy.orm import Session
from services.analyzers_service import AnalyzerService

from services.courses_service import CourseService
from services.teams_service import TeamService


class AssignmentService:
    @staticmethod
    def get_assignments(db):
        return AssignmentRepository.get_assignments(db)

    @staticmethod
    def get_assignment(db, assignment_id):
        assignemnt = AssignmentRepository.get_assignment(db, assignment_id)
        if assignemnt is None:
            raise HTTPException(
                status_code=404, detail=f"Assignment with id {assignment_id} not found"
            )
        return assignemnt

    @staticmethod
    def get_assignment_projects(db, assignment_id):
        AssignmentService.get_assignment(db, assignment_id)

        return AssignmentRepository.get_assignment_projects(db, assignment_id)

    @staticmethod
    def create_assignment(db: Session, assignment: assingment_schema.AssignmentCreate):
        course_id = assignment.course_id
        CourseService.get_course(db=db, course_id=course_id)

        return AssignmentRepository.create_assignment(db=db, assignment=assignment)

    @staticmethod
    def get_assignment_team_repos_reports(
        db: Session, assignment_id: int, team_id: int
    ):
        AssignmentService.get_assignment(db, assignment_id)
        TeamService.get_team(db, team_id)

        return AssignmentRepository.get_assignment_team_repos_reports(
            db, assignment_id=assignment_id, team_id=team_id
        )

    @staticmethod
    def get_assignment_analyzers(db: Session, assignemnt_id: int):
        AssignmentService.get_assignment(db, assignemnt_id)

        return AnalyzerRepository.get_analyzers_by_assignment_id(db, assignemnt_id)

    @staticmethod
    def get_assignment_metadata(
        db: Session, assignemnt_id: int
    ) -> List[assingment_schema.AssignmentMetadataResponse]:
        return AssignmentRepository.get_assignment_metadata_for_assignment(
            db, assignemnt_id
        )

    @staticmethod
    def connect_assignmnet_analyzer(db, assignemnt_id, analyzer_id):
        AssignmentService.get_assignment(db, assignemnt_id)
        AnalyzerService.get_analyzer(db, analyzer_id)

        return AssignmentRepository.connect_assignment_analyzer(
            db, assignemnt_id, analyzer_id
        )
