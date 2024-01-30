from fastapi import UploadFile
import os
from fastapi import HTTPException


base_dir = "test/upload/files"
script_name = "main.py"


def store_file(analyzer_id: int, file: UploadFile):
    try:
        directory = f"{base_dir}/{analyzer_id}"

        if not os.path.exists(directory):
            os.makedirs(directory)

        file_path = os.path.join(directory, script_name)

        with open(file_path, "wb") as buffer:
            buffer.write(file.file.read())

    except IOError as e:
        print(e)
        raise HTTPException(status_code=500, detail="File storage failed.")


def validate_file(analyzer_id: int):
    try:
        fileExists = os.path.isfile(f"{base_dir}/{analyzer_id}/{script_name}")
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error checking file existence.")

    return fileExists


def validate_venv(analyzer_id: int):
    try:
        venvExists = os.path.isdir(f"{base_dir}/{analyzer_id}/venv")
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=500, detail="Error checking virtual environment existence."
        )

    return venvExists


def read_file(analyzer_id: int):
    try:
        with open(f"{base_dir}/{analyzer_id}/{script_name}") as f:
            content = f.read()
    except IOError as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error reading file")

    return content
