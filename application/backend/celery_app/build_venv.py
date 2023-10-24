from pathlib import Path
from celery import Celery
import hashlib
import subprocess
import os
from celery_app.main import app


@app.task
def create_venv_from_requirements(
    script_path: str, requirements_path: str, analyzer_id: int
):
    # Generate a hash based on the requirements.txt to identify the virtual environment
    requirements_data = Path(requirements_path).read_text()
    env_hash = hashlib.md5(requirements_data.encode()).hexdigest()

    # Create a directory to store venvs for each analyzer
    venv_directory = f"venvs/{analyzer_id}"
    if not os.path.exists(venv_directory):
        os.makedirs(venv_directory)

    # Define the path to store the venv
    venv_path = os.path.join(venv_directory, env_hash)

    try:
        # Create the venv
        subprocess.run(["python3", "-m", "venv", venv_path])

        # Activate the venv and install the requirements
        activation_command = f"source {venv_path}/bin/activate"
        install_command = f"pip install -r {requirements_path}"
        subprocess.run(f"{activation_command} && {install_command}", shell=True)

    except Exception as e:
        # Handle any exceptions here (Logging, alerting, etc.)
        print(f"An error occurred: {e}")

    return {"message": f"Virtual environment created at {venv_path}"}


# Example usage
if __name__ == "__main__":
    script_path = "scripts/some_script.py"
    requirements_path = "requirements/some_requirements.txt"
    analyzer_id = 1

    create_venv_from_requirements.apply_async(
        (script_path, requirements_path, analyzer_id)
    )
