from celery_app.main import app
from celery_app.helpers import fetchProjectsAndMetadataHelper, fetchIOHelper

import sys
import subprocess

import docker
from pathlib import Path
import json

from services.analyzers_service import AnalyzerService
from services.projects_service import ProjectsService

from db.database import get_db

from utils.validationUtils import validate_report, validate_type
from utils.fileUtils import create_if_not_exists, script_exists, venv_exists
from schemas.shared import BatchEnum
from schemas.reports_schema import ReportCreate
from db.crud.batches_crud import BatchesRepository
from db.crud.reports_crud import ReportRepository
from configs.config import settings


@app.task
def run_analyzer(project_ids: list[int], batch_id: int):
    db = next(get_db())

    batch = BatchesRepository.update_batch_status(
        db=db, batch_id=batch_id, status=BatchEnum.RUNNING
    )

    analyzer_id = batch.analyzer_id
    assignment_id = batch.assignment_id

    # construct paths
    base_path = Path(settings.BASE_DIR) / str(analyzer_id)
    script_path = base_path / settings.DEFAULT_SCRIPT_NAME
    venv_path = base_path / settings.DEFAULT_VENV_NAME
    container_base_path = Path("/app")
    container_script_path = container_base_path / settings.DEFAULT_SCRIPT_NAME
    container_venv_path = container_base_path / settings.DEFAULT_VENV_NAME

    # construct docker
    client = docker.from_env()
    container = client.containers.create(
        "python:3.11",
        "tail -f /dev/null",
        volumes={
            str(script_path): {"bind": container_script_path, "mode": "ro"},
            str(venv_path): {"bind": container_venv_path, "mode": "ro"},
        },
        detach=True,
    )
    container.start()

    required_inputs, required_outputs = fetchIOHelper(db, analyzer_id)

    projects_with_metadata = fetchProjectsAndMetadataHelper(
        db, project_ids, required_inputs, assignment_id
    )

    try:
        # Loop through all projects to be analyzed,
        # for each repo, execute analysis inside container with the correct venv
        for project_id, metadata in projects_with_metadata.items():
            env_vars_shell = " ".join(
                f"{key}={value}" for key, value in metadata.items()
            )

            container_python_executable = container_venv_path / "bin" / "python"

            # Run the script using the virtual environment and env variables
            run_command = f"{container_python_executable} {env_vars_shell} {container_script_path}"
            print(run_command)

            result = container.exec_run(run_command)

            # Return the output (or error message)
            if result.exit_code == 0:
                # return {"status": "success", "output": result.output.decode('utf-8')}

                # Send "result" to db with the corresponding project_id
                # print(project_id, ": ", result.output.decode("utf-8"))
                try:
                    parsed_result = json.loads(result.output.decode("utf-8"))

                    # Assume required_outputs is constructed as shown previously
                    validation_errors = validate_report(parsed_result, required_outputs)

                    if validation_errors:
                        # Handle validation errors as needed
                        print("Validation errors:", validation_errors)
                    else:
                        # Result is valid; proceed with storing in the database
                        print("Validation successful.")

                        ReportRepository.create_report(
                            db,
                            report=ReportCreate(
                                report=parsed_result,
                                project_id=project_id,
                                batch_id=batch_id,
                            ),
                        )
                except json.JSONDecodeError:
                    pass
            else:
                print("Something wrong: ", result.exit_code, result)
                # Need some kind of error handling here
                # return {"status": "failure", "error": result.output.decode('utf-8')}

        BatchesRepository.update_batch_status(
            db=db, batch_id=batch_id, status=BatchEnum.FINISHED
        )

    finally:
        # Clean up: stop and remove the container
        container.stop()
        container.remove()


@app.task
def create_venv_from_requirements(
    analyzer_id: int,
):
    analyzer_path = Path(settings.BASE_DIR) / str(analyzer_id)
    create_if_not_exists(analyzer_path)

    venv_path = analyzer_path / settings.DEFAULT_VENV_NAME

    if venv_exists(analyzer_id):
        return {"Venv already exists"}

    try:
        subprocess.check_call([sys.executable, "-m", "venv", str(venv_path)])
    except subprocess.CalledProcessError as e:
        print(e)
        return

    python_executable = venv_path / "bin" / "python"

    if not script_exists(analyzer_id=analyzer_id, requirements=True):
        print(
            f"Something went wrong while localizing requirements.txt for analyzer with id {analyzer_id}"
        )

    requirements_path = analyzer_path / settings.DEFAULT_REQUIREMENTS_NAME
    try:
        subprocess.check_call(
            [
                str(python_executable),
                "-m",
                "pip",
                "install",
                "-r",
                str(requirements_path),
            ]
        )

    except subprocess.CalledProcessError as e:
        print(e)
        return

    return


@app.task
def show_python_path():
    import sys

    return sys.path
