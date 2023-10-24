from fastapi import UploadFile
import os


def store_file(analyzer_id: int, file: UploadFile):
    try:
        directory = f"test/files/{analyzer_id}"

        # create folder if not exists
        if not os.path.exists(directory):
            os.makedirs(directory)

        # concat file path
        file_path = os.path.join(directory, file.filename)

        # Save the file
        with open(file_path, "wb") as buffer:
            buffer.write(file.file.read())

    except Exception as e:
        print(e)

    return "gucci"
