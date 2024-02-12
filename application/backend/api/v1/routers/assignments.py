from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from schemas.shared import BatchEnum
from schemas import batch_schema
from services.batch_service import BatchService
from schemas import reports_schema, project_schema, analyzer_schema

from db.database import get_db
from schemas import assingment_schema
from services.assignments_service import AssignmentService

router = APIRouter(prefix="/api/v1/assignments")


@router.get("/", operation_id="get-all-assignments")
async def get_all_assignments(
    db=Depends(get_db),
) -> List[assingment_schema.AssignmentResponse]:
    return AssignmentService.get_assignments(db)


@router.get("/{assignment_id}", operation_id="get-assignment")
async def get_assignment(
    assignment_id: int,
    db=Depends(get_db),
) -> assingment_schema.AssignmentResponse:
    return AssignmentService.get_assignment(db, assignment_id)


@router.get("/{assignment_id}/projects", operation_id="get-assignment-projects")
async def get_assignment_projects(
    assignment_id: int, db=Depends(get_db)
) -> List[project_schema.ProjectResponse]:
    return AssignmentService.get_assignment_projects(db, assignment_id)


@router.post("/")
def create_assignment(
    assignment: assingment_schema.AssignmentCreate, db: Session = Depends(get_db)
):
    return AssignmentService.create_assignment(db, assignment)


@router.get(
    "/{assignment_id}/teams/{team_id}/projects/reports",
    operation_id="get-assignment-projects-reports",
)
def get_assignment_team_projects_reports(
    assignment_id: int, team_id: int, db=Depends(get_db)
) -> List[reports_schema.ReportResponse]:
    return AssignmentService.get_assignment_team_projects_reports(
        db=db, assignment_id=assignment_id, team_id=team_id
    )


@router.get(
    "/{assignment_id}/teams/{team_id}/projects/reports/batch/{batch_id}",
    operation_id="get-assignment-projects-reports-batch",
)
def get_assignment_team_projects_report_batch(
    assignment_id: int, team_id: int, batch_id: int, db=Depends(get_db)
) -> reports_schema.ReportResponse:

    batch = BatchService.get_batch(db, batch_id)
    if batch.status is not BatchEnum.FINISHED:
        raise HTTPException(
            status_code=404,
            detail=f"The batch you are trying to fetch report from is not successfully finished. Batch status: {BatchEnum(batch.status).value}",
        )
    return AssignmentService.get_assignment_team_projects_reports_batch(
        db=db, assignment_id=assignment_id, team_id=team_id, batch_id=batch_id
    )


@router.get("/{assignment_id}/analyzers", operation_id="get-assignment-analyzers")
def get_assignment_analyzers(
    assignment_id: int, db=Depends(get_db)
) -> List[analyzer_schema.AnalyzerSimplifiedResponse]:
    return AssignmentService.get_assignment_analyzers(
        db=db, assignemnt_id=assignment_id
    )


@router.get(
    "/{assignment_id}/analyzers/{analyzer_id}/batches",
    operation_id="get-assignment-analyzers-batches",
)
def get_assignment_analyzer_batches(
    assignment_id: int, analyzer_id: int, db=Depends(get_db)
) -> List[batch_schema.BatchResponse]:
    return BatchService.get_assignment_analyzers_batches(
        db=db, assignemnt_id=assignment_id, analyzer_id=analyzer_id
    )


@router.post(
    "/{assignment_id}/analyzers/{analyzer_id}/connect",
    operation_id="connect-assignment-analyzers",
)
def connect_assignmnet_analyzer(
    assignment_id: int, analyzer_id: int, db=Depends(get_db)
):
    return AssignmentService.connect_assignmnet_analyzer(
        db=db, assignemnt_id=assignment_id, analyzer_id=analyzer_id
    )


# def restructure_metric_definitions(metric_definitions_data):
#     structured_data = defaultdict(list)

#     for metric in metric_definitions_data:
#         analyzer_id = metric["analyzer"]
#         structured_data[analyzer_id].append(metric)

#     return dict(structured_data)


# @router.get(
#     "/{assignment_id}/repositories_with_reports",
#     operation_id="get-assignment-repositories-reports",
# )
# async def get_assignment_repositories_reports(assignment_id: int):
#     repositories = select(r for r in Repository if r.assignment.id == assignment_id)[:]
#     repository_data = []

#     unique_analyzer_ids = set()

#     for repo in repositories:
#         reports = select(report for report in Report if report.repository == repo)[:]
#         repo_dict = repo.to_dict()
#         repo_dict["reports"] = [report.to_dict() for report in reports]

#         # Append unique analyzer IDs
#         for report in reports:
#             if report.analyzer:
#                 unique_analyzer_ids.add(report.analyzer.id)

#         repository_data.append(repo_dict)

#     metric_definitions = select(
#         m for m in MetricDefinition if m.analyzer.id in unique_analyzer_ids
#     )[:]
#     metric_definitions_data = [metric.to_dict() for metric in metric_definitions]
#     structured_metric_definitions = restructure_metric_definitions(
#         metric_definitions_data
#     )

#     return {
#         "repo_data": repository_data,
#         "metric_metadata": structured_metric_definitions,
#     }


# @router.post("/create", operation_id="create-course")
# async def create_course(param):
#     return {"message": "Task started"}
