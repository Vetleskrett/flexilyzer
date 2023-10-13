from celery import Celery
import docker
import hashlib
from pathlib import Path

app = Celery("tasks", broker="redis://localhost:6379/0")

## analyzer_args:

[
    {"github": "www.github.com/example"},
    {"github": "www.github.com/example2"},
    {"github": "www.github.com/example3"},
]


'''Some pseudo code'''

@app.task
def celery_task(script_path: str, requirements_path: str, analyzer_args: dict):
    client = docker.from_env()

    # Generate a hash based on the requirements.txt to identify the virtual environment
    requirements_data = Path(requirements_path).read_text()
    env_hash = hashlib.md5(requirements_data.encode()).hexdigest()
    venv_path = f"/venvs/{env_hash}"


    # Create docker container
    container = client.containers.create(
        'python:3.11',
        'tail -f /dev/null',
        volumes={'python-envs': {'bind': '/venvs', 'mode': 'rw'}},
        detach=True
    )

    try:
        # Loop through all repos to be analyzed,
        # for each repo, execute analysis inside container with the correct venv
        for env_vars in analyzer_args:

            env_vars_shell = " ".join(f"{key}={value}" for key, value in env_vars.items())

            # Copy the script and venv into the container
            

            # Run the script using the virtual environment and env variables
            run_command = f"env {env_vars_shell} {venv_path}/bin/python /app/{Path(script_path).name}"
            result = container.exec_run(run_command)

            
            # Return the output (or error message)
            if result.exit_code == 0:
                return {"status": "success", "output": result.output.decode('utf-8')}
            else:
                return {"status": "failure", "error": result.output.decode('utf-8')}
            
    finally:
        # Clean up: stop and remove the container
        container.stop()
        container.remove()