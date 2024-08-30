from celery_app.helpers import fetchProjectsAndMetadataHelper, fetchIOHelper

from celery import Task, Celery

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
from configs.config import settings


class RunAnalyzer(Task):

    name = "celery_app.tasks.run_analyzer"

    def run(self, project_ids: list[int], batch_id: int, course_id: int):
        db = next(get_db())

        batch = BatchesRepository.update_batch_status(
            db=db, batch_id=batch_id, status=BatchEnum.RUNNING
        )

        analyzer_id = batch.analyzer_id
        assignment_id = batch.assignment_id

        # construct paths
        container_base_path = Path("/app")
        container_script_path = container_base_path / settings.DEFAULT_SCRIPT_NAME
        dockerfile_path = Path(settings.BASE_DIR)

        required_inputs, required_outputs = fetchIOHelper(db, analyzer_id)

        projects_with_metadata: Dict[int, Dict] = fetchProjectsAndMetadataHelper(
            db, project_ids, required_inputs, assignment_id
        )

        
        file_delivery_path = None
        if "zip_file_path" in required_inputs:
            file_delivery_path = Path(settings.BASE_DIR + settings.DELIVERIES_FOLDER) / str(course_id) / str(assignment_id) 


        volumes = {}    
        if file_delivery_path:
            volumes[str(file_delivery_path.absolute())] = {'bind': f'/app/{assignment_id}', 'mode': 'rw'}

        container = None

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
                volumes=volumes,
                detach=True,
            )


            container.start()

            errors = False

            for project_id, metadata in projects_with_metadata.items():
                run_command = f"python {str(container_script_path)}"

                if file_delivery_path:
                    metadata["ZIP_FILE_PATH"] = str(container_base_path / str(assignment_id) / metadata["ZIP_FILE_PATH"])

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
                            print(result.output)
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
            print("Catch")
            print(e)
            BatchesRepository.update_batch_status(
                db=db, batch_id=batch_id, status=BatchEnum.FAILED
            )

        finally:
            if container:
                container.stop()
                container.remove()


run_analyzer = RunAnalyzer()
app = Celery("celery_app", broker=settings.CELERY_BROKER_URL)
app.register_task(run_analyzer)