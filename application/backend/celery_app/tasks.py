from celery_app.main import app
from celery_app.helpers import fetchProjectsAndMetadataHelper, fetchIOHelper


from pathlib import Path
import json
import docker
from docker.models.containers import Container
from docker.errors import APIError
from db.database import get_db

from utils.validationUtils import validate_report
from schemas.shared import BatchEnum
from schemas.reports_schema import ReportCreate
from db.crud.batches_crud import BatchesRepository
from db.crud.reports_crud import ReportRepository
from configs.config import settings
from typing import Dict


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
    container_base_path = Path("/app")
    container_script_path = container_base_path / settings.DEFAULT_SCRIPT_NAME
    dockerfile_path = Path(settings.BASE_DIR)

    try:
        client = docker.from_env()

        client.images.build(
            path=str(dockerfile_path.resolve()),
            buildargs={"ANALYZER_ID": str(analyzer_id)},
            tag=f"analyzer-app:{analyzer_id}",
        )
        container: Container = client.containers.create(
            f"analyzer-app:{analyzer_id}",
            "tail -f /dev/null",
            volumes={
                str(script_path.resolve()): {
                    "bind": str(container_script_path),
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
        errors = False

        for project_id, metadata in projects_with_metadata.items():
            run_command = f"python {str(container_script_path)}"

            try:
                result = container.exec_run(run_command, environment=metadata)
            except APIError as e:
                print(e)

            else:
                # Return the output (or error message)
                if result.exit_code == 0:
                    try:
                        parsed_result = json.loads(result.output.decode("utf-8"))
                    except json.JSONDecodeError as e:
                        print(e)
                        errors = True
                    else:
                        validation_errors = validate_report(
                            parsed_result, required_outputs
                        )

                        if validation_errors:
                            print("Validation errors:", validation_errors)
                            errors = True
                        else:
                            ReportRepository.create_report(
                                db,
                                report=ReportCreate(
                                    report=json.dumps(parsed_result),
                                    project_id=project_id,
                                    batch_id=batch_id,
                                ),
                            )

                else:
                    print(
                        "Something wrong happend when executing the script in the container: ",
                        result,
                    )
                    errors = True

        if not errors:
            BatchesRepository.update_batch_status(
                db=db, batch_id=batch_id, status=BatchEnum.FINISHED
            )
        else:
            BatchesRepository.update_batch_status(
                db=db, batch_id=batch_id, status=BatchEnum.FAILED
            )

    except Exception as e:
        print(e)
        BatchesRepository.update_batch_status(
            db=db, batch_id=batch_id, status=BatchEnum.FAILED
        )

    finally:
        pass
        # container.stop()
        # container.remove()


# from utils.fileUtils import create_if_not_exists, script_exists, venv_exists

# @app.task
# def create_venv_from_requirements(
#     analyzer_id: int,
# ):
#     analyzer_path = Path(settings.BASE_DIR) / str(analyzer_id)
#     create_if_not_exists(analyzer_path)

#     venv_path = analyzer_path / settings.DEFAULT_VENV_NAME

#     if venv_exists(analyzer_id):
#         return {"Venv already exists"}

#     try:
#         subprocess.check_call([sys.executable, "-m", "venv", str(venv_path)])
#     except subprocess.CalledProcessError as e:
#         print(e)
#         return

#     python_executable = venv_path / "bin" / "python"

#     if not script_exists(analyzer_id=analyzer_id, requirements=True):
#         print(
#             f"Something went wrong while localizing requirements.txt for analyzer with id {analyzer_id}"
#         )

#     requirements_path = analyzer_path / settings.DEFAULT_REQUIREMENTS_NAME
#     try:
#         subprocess.check_call(
#             [
#                 str(python_executable),
#                 "-m",
#                 "pip",
#                 "install",
#                 "-r",
#                 str(requirements_path),
#             ]
#         )

#     except subprocess.CalledProcessError as e:
#         print(e)
#         return

#     return


# import sys
# import subprocess


# @app.task
# def show_python_path():
#     import sys

#     return sys.path
