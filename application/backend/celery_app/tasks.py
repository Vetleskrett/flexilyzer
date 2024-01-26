from celery_app.main import app

## analyzer_args:

"""The celery task for executing an analyzer on a set of projects"""


@app.task
def celery_task(analyzer_id: int, project_ids: list):
    import docker
    from pathlib import Path
    import json

    from services.analyzers_service import AnalyzerService
    from services.projects_service import ProjectsService

    from db.database import get_db

    from .validation_utils import validate_report, validate_type

    # requirements_path = "test/celery_test/requirments.txt"
    script_path = "test/celery_testing/test_analyzer.py"
    abs_script_path = Path(script_path).absolute()

    container_script_path = "/app/test_analyzer.py"

    # Generate a hash based on the requirements.txt to identify the virtual environment
    # requirements_data = Path(requirements_path).read_text()
    # env_hash = hashlib.md5(requirements_data.encode()).hexdigest()
    # venv_path = f"/venvs/{env_hash}"

    client = docker.from_env()

    # Create docker container
    container = client.containers.create(
        "python:3.11",
        "tail -f /dev/null",
        volumes={
            str(abs_script_path): {"bind": container_script_path, "mode": "ro"},
            "python-envs": {"bind": "/venvs", "mode": "rw"},
        },
        detach=True,
    )

    container.start()

    db = next(get_db())
    # Fetch all required analyzer inputs from DB
    required_input_objects = AnalyzerService.get_analyzer_inputs(db, analyzer_id)
    # Extract the key_name from each AnalyzerInput object into a set
    required_inputs = {input_obj.key_name for input_obj in required_input_objects}
    required_output_objects = AnalyzerService.get_analyzer_outputs(db, analyzer_id)
    # Extract the key_name from each AnalyzerInput object into a set

    required_outputs = {
        output_obj.key_name: {
            "value_type": output_obj.value_type,
            "extended_metadata": output_obj.extended_metadata
            if output_obj.extended_metadata
            else None,
        }
        for output_obj in required_output_objects
    }
    print(required_outputs)
    projects_with_metadata = {}
    # Fetch all required metadata for all projects
    for id in project_ids:
        # Fetch project metadata, assuming it returns a dict-like object
        project_metadata_objects = ProjectsService.get_project(db, id).project_metadata

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

            # Execute `ls` command in the container directory
            exec_result = container.exec_run(f"ls -l /app")

            # Run the script using the virtual environment and env variables
            run_command = f"python /app/{Path(script_path).name}"
            result = container.exec_run(run_command)

            # Return the output (or error message)
            if result.exit_code == 0:
                # return {"status": "success", "output": result.output.decode('utf-8')}

                # Send "result" to db with the corresponding project_id
                print(project_id, ": ", result.output.decode("utf-8"))
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
                except json.JSONDecodeError:
                    pass
            else:
                print("Something wrong: ", result.exit_code, result)
                # Need some kind of error handling here
                # return {"status": "failure", "error": result.output.decode('utf-8')}

    finally:
        # Clean up: stop and remove the container
        container.stop()
        container.remove()


@app.task
def show_python_path():
    import sys

    return sys.path
