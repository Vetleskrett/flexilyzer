from fastapi import HTTPException
from pydantic import ValidationError


def validatePydanticToHTTPError(schema, to_validate):
    try:
        schema(**to_validate)
    except ValidationError as e:
        simplified_errors = [
            {
                "message": error["msg"],
            }
            for error in e.errors()
        ]
        raise HTTPException(status_code=400, detail=simplified_errors)
