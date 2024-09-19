from fastapi import HTTPException
from pathlib import Path
import aiofiles
from configs.config import settings
from schemas.analyzer_schema import FileUpload

def create_if_not_exists(path: Path):
    return path.mkdir(parents=True, exist_ok=True)


async def store_file(analyzer_id: int, file: FileUpload, requirements: bool = False):
    try:
        directory = Path(settings.BASE_DIR + settings.SCRIPTS_FOLDER) / str(analyzer_id)
        create_if_not_exists(directory)

        file_path = directory / (
            settings.DEFAULT_SCRIPT_NAME
            if not requirements
            else settings.DEFAULT_REQUIREMENTS_NAME
        )

        async with aiofiles.open(file_path, mode="w") as buffer:
            await buffer.write(file.text)

    except OSError as e:
        print(e)
        raise HTTPException(status_code=500, detail="File storage failed.")


def script_exists(analyzer_id: int, requirements: bool = False):
    file_path = (
        Path(settings.BASE_DIR + settings.SCRIPTS_FOLDER)
        / str(analyzer_id)
        / (
            settings.DEFAULT_SCRIPT_NAME
            if not requirements
            else settings.DEFAULT_REQUIREMENTS_NAME
        )
    )

    return file_path.is_file()


def read_file(analyzer_id: int, requirements: bool = False):
    try:
        file_path = (
            Path(settings.BASE_DIR + settings.SCRIPTS_FOLDER)
            / str(analyzer_id)
            / (
                settings.DEFAULT_SCRIPT_NAME
                if not requirements
                else settings.DEFAULT_REQUIREMENTS_NAME
            )
        )
        with file_path.open() as f:
            content = f.read()
    except OSError as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error reading file")

    return content


def delete_file(analyzer_id: int, requirements: bool = False):
    try:
        file_path = (
            Path(settings.BASE_DIR + settings.SCRIPTS_FOLDER)
            / str(analyzer_id)
            / (
                settings.DEFAULT_SCRIPT_NAME
                if not requirements
                else settings.DEFAULT_REQUIREMENTS_NAME
            )
        )
        file_path.unlink(missing_ok=True)
    except OSError as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error deleting file")

    return None
