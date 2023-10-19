from typing import Optional
from fastapi import APIRouter
from pydantic import BaseModel


from db.models import (
    Assignment,
    Repository,
    MetricDefinition,
    Report,
)

from pony.orm import select


router = APIRouter(prefix="/api/v1/assignments")


@router.get("/", operation_id="get-all-assignments")
async def get_all_assignments():
    assignments = [
        {
            "id": assignment.id,
            "name": assignment.name,
            "due_date": assignment.due_date,
            "course": assignment.course.id,
        }
        for assignment in Assignment.select()
    ]
    return assignments


@router.get("/{assignment_id}/repositories", operation_id="get-assignment-repositories")
async def get_assignment_repositories(assignment_id: int):
    repos = select(r for r in Repository if r.assignment.id == assignment_id)[:]
    return [repo.to_dict() for repo in repos]


from collections import defaultdict


def restructure_metric_definitions(metric_definitions_data):
    structured_data = defaultdict(list)

    for metric in metric_definitions_data:
        analyzer_id = metric["analyzer"]
        structured_data[analyzer_id].append(metric)

    return dict(structured_data)



@router.get(
    "/{assignment_id}/repositories_with_reports",
    operation_id="get-assignment-repositories-reports",
)
async def get_assignment_repositories_reports(assignment_id: int):
    repositories = select(r for r in Repository if r.assignment.id == assignment_id)[:]
    repository_data = []

    unique_analyzer_ids = set()

    for repo in repositories:
        reports = select(report for report in Report if report.repository == repo)[:]
        repo_dict = repo.to_dict()
        repo_dict["reports"] = [report.to_dict() for report in reports]

        # Append unique analyzer IDs
        for report in reports:
            if report.analyzer:
                unique_analyzer_ids.add(report.analyzer.id)

        repository_data.append(repo_dict)

    metric_definitions = select(
        m for m in MetricDefinition if m.analyzer.id in unique_analyzer_ids
    )[:]
    metric_definitions_data = [metric.to_dict() for metric in metric_definitions]
    structured_metric_definitions = restructure_metric_definitions(
        metric_definitions_data
    )

    return {
        "repo_data": repository_data,
        "metric_metadata": structured_metric_definitions,
    }


@router.post("/create", operation_id="create-course")
async def create_course(param):
    return {"message": "Task started"}
