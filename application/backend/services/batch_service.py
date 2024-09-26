import json
from fastapi import HTTPException
from schemas.shared import BatchEnum, ValueTypesOutput
from db.crud.reports_crud import ReportRepository
from services.reports_service import ReportService
from services.analyzers_service import AnalyzerService
from services.assignments_service import AssignmentService
from services.teams_service import TeamService
from db.crud.batches_crud import BatchesRepository
from db.crud.assignments_crud import AssignmentRepository
from datetime import datetime, timedelta
from configs.config import settings
from pathlib import Path


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
    def get_assignment_analyzers_batches(db, analyzer_id, assignment_id):
        AnalyzerService.get_analyzer(db=db, analyzer_id=analyzer_id)
        AssignmentService.get_assignment(db=db, assignment_id=assignment_id)

        return BatchesRepository.get_batch_by_assignment_and_analyzer(
            db, assignment_id=assignment_id, analyzer_id=analyzer_id
        )

    @staticmethod
    def get_latest_batch(db, assignment_id, analyzer_id):

        batch = BatchesRepository.get_latest_batch(
            db, assignment_id=assignment_id, analyzer_id=analyzer_id
        )
        if not batch:
            raise HTTPException(status_code=204, detail=f"No batches found")
        return batch

    @staticmethod
    def get_assignment_analyzers_batches_latest_reports(db, analyzer_id, assignment_id):

        AnalyzerService.get_analyzer(db=db, analyzer_id=analyzer_id)
        AssignmentService.get_assignment(db=db, assignment_id=assignment_id)

        batch = BatchService.get_latest_batch(
            db, assignment_id=assignment_id, analyzer_id=analyzer_id
        )

        return ReportRepository.get_batch_reports_w_team(db, batch.id)

    @staticmethod
    def get_batch_stats(db, batch_id):

        batch = BatchService.get_batch(db=db, batch_id=batch_id)

        analyzer_outputs = AnalyzerService.get_analyzer_outputs(
            db=db, analyzer_id=batch.analyzer_id
        )

        stats = dict()

        for output in analyzer_outputs:
            if output.value_type == ValueTypesOutput.str:
                continue
            elif output.value_type == ValueTypesOutput.bool:
                stats[output.key_name] = {"distribution": {"true": 0, "false": 0}}
            elif output.value_type == ValueTypesOutput.int:
                stats[output.key_name] = {"avg": None}
            elif output.value_type == ValueTypesOutput.range:
                stats[output.key_name] = {"avg": None}
            elif output.value_type == ValueTypesOutput.date:
                stats[output.key_name] = {"avg": None}
            else:
                continue

        reports = BatchService.get_batch_reports(db=db, batch_id=batch_id)

        # Assuming ValueTypesOutput is an Enum with possible value types
        for report in reports:
            for key, value in json.loads(report.report).items():
                # Skip keys not in analyzer_outputs
                if key not in stats:
                    continue

                output = next((o for o in analyzer_outputs if o.key_name == key), None)
                if not output:
                    continue

                if type(value) == dict:
                    value = value["value"] 

                # Handle boolean values: Update distribution counts
                if output.value_type == ValueTypesOutput.bool:
                    bool_value = str(
                        value
                    ).lower()  # Convert boolean to string and lowercase
                    if bool_value in stats[key]["distribution"]:
                        if stats[key]["distribution"][bool_value] is None:
                            stats[key]["distribution"][bool_value] = 1
                        else:
                            stats[key]["distribution"][bool_value] += 1
                    continue

                # Handle integer and range values: Calculate average
                if output.value_type in [
                    ValueTypesOutput.int,
                    ValueTypesOutput.range,
                    ValueTypesOutput.date,
                ]:
                    if "values" not in stats[key]:
                        stats[key]["values"] = []
                    stats[key]["values"].append(value)

        # Finalize stats by calculating averages
        for key, value in stats.items():
            output = next((o for o in analyzer_outputs if o.key_name == key), None)
            if not output:
                continue

            if output.value_type in [ValueTypesOutput.int, ValueTypesOutput.range]:
                avg_value = (
                    sum(value["values"]) / len(value["values"])
                    if value["values"]
                    else None
                )
                stats[key]["avg"] = stats[key].pop("values")
                stats[key]["avg"] = avg_value

            elif output.value_type == ValueTypesOutput.date:
                if value["values"]:
                    datetime_objects = [
                        datetime.strptime(date_string, "%Y-%m-%dT%H:%M:%S")
                        for date_string in value["values"]
                    ]
                    # Convert each datetime object to a timestamp and calculate the average
                    avg_timestamp = sum(
                        dt.timestamp() for dt in datetime_objects
                    ) / len(value["values"])
                    # Convert the average timestamp back to a datetime object
                    avg_date = datetime.fromtimestamp(avg_timestamp)
                    avg_value = str(avg_date)
                else:
                    avg_value = None

                stats[key]["avg"] = stats[key].pop("values")
                stats[key]["avg"] = avg_value

            elif output.value_type == ValueTypesOutput.bool:
                true_count = stats[key]["distribution"]["true"]
                false_count = stats[key]["distribution"]["false"]
                stats[key]["distribution"]["true"] = (
                    true_count / (true_count + false_count)
                ) * 100
                stats[key]["distribution"]["false"] = (
                    100 - stats[key]["distribution"]["true"]
                )

        return {"id": batch_id, "stats": stats}

    @staticmethod
    def get_batch_reports(db, batch_id: int):
        BatchService.get_batch(db=db, batch_id=batch_id)

        return ReportRepository.get_batch_reports(db, batch_id)

    @staticmethod
    def get_assignment_team_projects_reports_batch(
        db, assignment_id: int, team_id: int, batch_id: int
    ):

        batch = BatchService.get_batch(db, batch_id)

        if batch.status in [BatchEnum.STARTED, BatchEnum.RUNNING]:
            raise HTTPException(
                status_code=404,
                detail=f"The batch you are trying to fetch report from is not successfully finished. Batch status: {BatchEnum(batch.status).value}",
            )
        AssignmentService.get_assignment(db, assignment_id)
        TeamService.get_team(db, team_id)

        report = AssignmentRepository.get_assignment_team_projects_reports_batch(
            db, assignment_id=assignment_id, team_id=team_id, batch_id=batch_id
        )
        if report is None:
            raise HTTPException(
                status_code=404,
                detail=f"Could not find report for Team with ID {team_id} in Batch with ID {batch_id}",
            )
        return report

    @staticmethod
    def get_assignment_team_projects_reports_batch_file(
        db, course_id: int, assignment_id: int, team_id: int, batch_id: int, key_name: str
    ):
        batch = BatchService.get_batch(db, batch_id)

        if batch.status in [BatchEnum.STARTED, BatchEnum.RUNNING]:
            raise HTTPException(
                status_code=404,
                detail=f"The batch you are trying to fetch report from is not successfully finished. Batch status: {BatchEnum(batch.status).value}",
            )
        AssignmentService.get_assignment(db, assignment_id)
        TeamService.get_team(db, team_id)

        report = AssignmentRepository.get_assignment_team_projects_reports_batch(
            db, assignment_id=assignment_id, team_id=team_id, batch_id=batch_id
        )
        if report is None:
            raise HTTPException(
                status_code=404,
                detail=f"Could not find report for Team with ID {team_id} in Batch with ID {batch_id}",
            )
        
        file_name = json.loads(report.report)[key_name]

        file_output_path = Path(settings.BASE_DIR) / settings.OUTPUT_FILES_FOLDER / str(course_id) / str(assignment_id) / str(batch_id)
        file_path = file_output_path / str(team_id) / file_name

        return file_path

