from celery_app.main import app
from celery_app.helpers import fetchProjectsAndMetadataHelper, fetchIOHelper

import sys
import subprocess

from pathlib import Path
import json
import docker
from docker.models.containers import Container
from docker.errors import APIError
from db.database import get_db

from utils.validationUtils import validate_report
from utils.fileUtils import create_if_not_exists, script_exists, venv_exists
from schemas.shared import BatchEnum
from schemas.reports_schema import ReportCreate
from db.crud.batches_crud import BatchesRepository
from db.crud.reports_crud import ReportRepository
from configs.config import settings
from typing import Dict


@app.task
def run_analyzer(project_ids: list[int], batch_id: int):
    print(project_ids, batch_id)

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

    # requirements.txt path
    requirements_path = base_path / settings.DEFAULT_REQUIREMENTS_NAME

    print("1")
    try:
        # construct docker
        client = docker.from_env()
        container: Container = client.containers.create(
            "python:3.11",
            "tail -f /dev/null",
            volumes={
                str(script_path.resolve()): {
                    "bind": str(container_script_path),
                    "mode": "ro",
                },
                str(venv_path.resolve()): {
                    "bind": str(container_venv_path),
                    "mode": "ro",
                },
            },
            detach=True,
        )
        container.start()

        required_inputs, required_outputs = fetchIOHelper(db, analyzer_id)

        projects_with_metadata: Dict[int, Dict] = fetchProjectsAndMetadataHelper(
            db, project_ids, required_inputs, assignment_id
        )

        print("2")
        print(projects_with_metadata)

        for project_id, metadata in projects_with_metadata.items():
            # env_vars_shell = " ".join(
            #     f'{key.upper()}="{value}"' for key, value in metadata.items()
            # )

            container_python_executable = container_venv_path / "bin" / "python"

            # Run the script using the virtual environment and env variables
            run_command = (
                f"{str(container_python_executable)}  {str(container_script_path)}"
            )
            print(run_command)
            print(metadata)

            try:
                result = container.exec_run(run_command, environment=metadata)
            except APIError as e:
                print("Whoopsie")
                print(e)

            else:
                # Return the output (or error message)
                if result.exit_code == 0:
                    try:
                        parsed_result = json.loads(result.output.decode("utf-8"))
                    except json.JSONDecodeError as e:
                        print("Whoopsiedaisy")
                        print(e)
                    else:
                        validation_errors = validate_report(
                            parsed_result, required_outputs
                        )

                        if validation_errors:
                            print("Whoopsiediays2")
                            print("Validation errors:", validation_errors)
                        else:
                            print("Validation successful.")

                            ReportRepository.create_report(
                                db,
                                report=ReportCreate(
                                    report=parsed_result,
                                    project_id=project_id,
                                    batch_id=batch_id,
                                ),
                            )

                else:
                    print("Whoopsie")
                    print(
                        "Something wrong executing the script in the container: ",
                        result.exit_code,
                        result,
                    )

        BatchesRepository.update_batch_status(
            db=db, batch_id=batch_id, status=BatchEnum.FINISHED
        )

    except Exception as e:
        print(e)

    # finally:
    #     container.stop()
    #     container.remove()


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
