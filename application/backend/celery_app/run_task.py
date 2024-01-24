import docker
import hashlib
from pathlib import Path

from celery_app.main import app

from services.analyzers_service import AnalyzerService
from services.projects_service import ProjectsService

## analyzer_args:

"""The celery task for executing an analyzer on a set of of projects"""


@app.task
def celery_task(
    script_path: str, requirements_path: str, analyzer_id: int, project_ids: list
):
    client = docker.from_env()

    # Generate a hash based on the requirements.txt to identify the virtual environment
    requirements_data = Path(requirements_path).read_text()
    env_hash = hashlib.md5(requirements_data.encode()).hexdigest()
    venv_path = f"/venvs/{env_hash}"

    # Create docker container
    container = client.containers.create(
        "python:3.11",
        "tail -f /dev/null",
        volumes={"python-envs": {"bind": "/venvs", "mode": "rw"}},
        detach=True,
    )

    # Fetch all required analyzer inputs from DB
    required_input_objects = AnalyzerService.get_analyzer_io().inputs

    # Extract the key_name from each AnalyzerInput object into a set
    required_inputs = {input_obj.key_name for input_obj in required_input_objects}

    projects_with_metadata = {}
    # Fetch all required metadata for all projects
    for id in project_ids:
        # Fetch project metadata, assuming it returns a dict-like object
        project_metadata_objects = ProjectsService.get_project(id).project_metadata

        filtered_metadata = {
            meta.key_name: meta.value
            for meta in project_metadata_objects
            if meta.key_name in required_inputs
        }

        # Store the filtered metadata in projects_with_metadata
        projects_with_metadata[id] = filtered_metadata

    try:
        # Loop through all projects to be analyzed,
        # for each repo, execute analysis inside container with the correct venv
        for project_id, metadata in projects_with_metadata.items():
            env_vars_shell = " ".join(
                f"{key}={value}" for key, value in metadata.items()
            )

            # Copy the script and venv into the container

            # Run the script using the virtual environment and env variables
            run_command = f"env {env_vars_shell} {venv_path}/bin/python /app/{Path(script_path).name}"
            result = container.exec_run(run_command)

            # Return the output (or error message)
            if result.exit_code == 0:
                # return {"status": "success", "output": result.output.decode('utf-8')}

                # Send "result" to db with the corresponding project_id
                print(project_id, ": ", result.output.decode("utf-8"))
            else:
                print("Something wrong: ", result.exit_code, result)
                # Need some kind of error handling here
                # return {"status": "failure", "error": result.output.decode('utf-8')}

    finally:
        # Clean up: stop and remove the container
        container.stop()
        container.remove()
