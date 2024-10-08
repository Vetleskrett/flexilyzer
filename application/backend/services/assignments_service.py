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
        assignment = AssignmentRepository.get_assignment(db, assignment_id)
        if assignment is None:
            raise HTTPException(
                status_code=404, detail=f"Assignment with id {assignment_id} not found"
            )
        return assignment

    @staticmethod
    def get_assignment_projects(db, assignment_id):
        AssignmentService.get_assignment(db, assignment_id)

        return AssignmentRepository.get_assignment_projects(db, assignment_id)

    @staticmethod
    def create_assignment(db: Session, assignment: assingment_schema.AssignmentCreate):
        course_id = assignment.course_id
        CourseService.get_course(db=db, course_id=course_id)

        assignment_base = assingment_schema.AssignmentBase(
            name=assignment.name,
            due_date=assignment.due_date,
            course_id=assignment.course_id
        )

        assignment_record = AssignmentRepository.create_assignment(db=db, assignment=assignment_base)

        for metadata in assignment.metadata:
            assignment_metadata = assingment_schema.AssignmentMetadataBase(
                assignment_id=assignment_record.id,
                key_name=metadata.key_name,
                value_type=metadata.value_type
            )
            AssignmentRepository.create_assignment_metadata(db=db, assignment_metadata=assignment_metadata)

        return assignment


    @staticmethod
    def get_assignment_team_project(
        db: Session, assignment_id: int, team_id: int
    ):
        AssignmentService.get_assignment(db, assignment_id)
        TeamService.get_team(db, team_id)

        return AssignmentRepository.get_assignment_team_project(
            db, assignment_id=assignment_id, team_id=team_id
        )


    @staticmethod
    def get_assignment_team_projects_reports(
        db: Session, assignment_id: int, team_id: int
    ):
        AssignmentService.get_assignment(db, assignment_id)
        TeamService.get_team(db, team_id)

        return AssignmentRepository.get_assignment_team_projects_reports(
            db, assignment_id=assignment_id, team_id=team_id
        )

    @staticmethod
    def get_assignment_analyzers(db: Session, assignment_id: int):
        AssignmentService.get_assignment(db, assignment_id)

        return AnalyzerRepository.get_analyzers_by_assignment_id(db, assignment_id)

    @staticmethod
    def get_assignment_metadata(
        db: Session, assignment_id: int
    ) -> List[assingment_schema.AssignmentMetadataResponse]:
        return AssignmentRepository.get_assignment_metadata_for_assignment(
            db, assignment_id
        )

    @staticmethod
    def connect_assignmnet_analyzer(db, assignment_id, analyzer_id):
        AssignmentService.get_assignment(db, assignment_id)
        AnalyzerService.get_analyzer(db, analyzer_id)

        return AssignmentRepository.connect_assignment_analyzer(
            db, assignment_id, analyzer_id
        )
