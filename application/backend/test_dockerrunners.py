import docker
import hashlib
from pathlib import Path
client = docker.from_env()


# Create docker container
container = client.containers.create(
    'python:3.11',
    'tail -f /dev/null',
    detach=True
)

# Copy the script and venv into the container


# Run the script using the virtual environment and env variables
run_command = f"python /app/test.py"
result = container.exec_run(run_command)
print(result)