from fastapi import UploadFile, HTTPException
from pathlib import Path
import aiofiles


base_dir = "test/upload/files"
script_name = "main.py"


async def store_file(analyzer_id: int, file: UploadFile):
    try:
        directory = Path(base_dir) / str(analyzer_id)
        directory.mkdir(parents=True, exist_ok=True)

        file_path = directory / script_name

        async with aiofiles.open(file_path, mode="wb") as buffer:
            while content := await file.read(1024):
                await buffer.write(content)

    except OSError as e:
        print(e)
        raise HTTPException(status_code=500, detail="File storage failed.")


def validate_file(analyzer_id: int):
    file_path = Path(base_dir) / str(analyzer_id) / script_name
    return file_path.is_file()


def validate_venv(analyzer_id: int):
    venv_path = Path(base_dir) / str(analyzer_id) / "venv"
    return venv_path.is_dir()


def read_file(analyzer_id: int):
    try:
        file_path = Path(base_dir) / str(analyzer_id) / script_name
        with file_path.open() as f:
            content = f.read()
    except OSError as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error reading file")

    return content


def delete_file(analyzer_id: int):
    try:
        file_path = Path(base_dir) / str(analyzer_id) / script_name
        file_path.unlink(missing_ok=True)
    except OSError as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error deleting file")

    return None
