from types import NoneType
from fastapi import HTTPException
from pydantic import ValidationError
import json
from schemas.shared import (
    ValueTypesOutput,
    ExtendedBool,
    ExtendedDatetime,
    ExtendedInt,
    ExtendedStr,
)
from datetime import datetime


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


def cast_to_pydantic(value, type):
    try:
        type(**value)
        return True
    except Exception:
        return False


def value_inside_range(value, from_range, to_range):
    return from_range <= value <= to_range


def validate_type(key, value, expected_type, extended_metadata=None):
    """
    Validate the type of a value against the expected type, including handling ranges as a distinct case.
    Also ensures extended_metadata is a dictionary and provides detailed error messages.
    """
    # Prepare a base error message component for type mismatches
    base_error_msg = f"Incorrect type for key '{key}'. Expected {expected_type}"

    if isinstance(extended_metadata, str):
        try:
            extended_metadata = json.loads(extended_metadata)
        except json.JSONDecodeError:
            print(f"Error decoding extended_metadata for key {key}")
            return False, "Error decoding extended_metadata"

    if isinstance(value, NoneType):
        return True, ""

    if expected_type == ValueTypesOutput.range:
        if "fromRange" in extended_metadata and "toRange" in extended_metadata:
            from_range = extended_metadata["fromRange"]
            to_range = extended_metadata["toRange"]
        else:
            return False, "Missing range definitions in metric metadata"

        if isinstance(value, (int, float)) and value_inside_range(
            value, from_range, to_range
        ):
            return True, ""
        elif cast_to_pydantic(value, ExtendedInt) and value_inside_range(
            value["value"], from_range, to_range
        ):
            return True, ""
        else:
            return False, f"{base_error_msg}, got {type(value).__name__}"

    elif expected_type == ValueTypesOutput.int:
        if isinstance(value, int):
            return True, ""
        elif cast_to_pydantic(value, ExtendedInt):
            return True, ""
        else:
            return False, f"{base_error_msg}, got {type(value).__name__}"

    elif expected_type == ValueTypesOutput.bool:
        if isinstance(value, bool):
            return True, ""
        elif cast_to_pydantic(value, ExtendedBool):
            return True, ""
        else:
            return False, f"{base_error_msg}, got {type(value).__name__}"

    elif expected_type == ValueTypesOutput.str:
        if isinstance(value, str):
            return True, ""
        elif cast_to_pydantic(value, ExtendedStr):
            return True, ""
        else:
            return False, f"{base_error_msg}, got {type(value).__name__}"

    elif expected_type == ValueTypesOutput.date:
        if isinstance(value, str):
            return True, ""
        elif cast_to_pydantic(value, ExtendedDatetime):
            return True, ""
        else:
            return False, f"{base_error_msg}, got {type(value).__name__}"

    else:
        print(type(key))
        print(type(expected_type))
        return False, f"Unknown or unsupported type, {key} - {value}"


def validate_report(report, required_outputs):
    """
    Validate the report against the required outputs, including handling extended metadata.
    Enhances error messages for range violations.
    """
    errors = []

    for key, specs in required_outputs.items():
        if key not in report:
            errors.append(f"Missing key: {key}")
            continue

        valid, error_message = validate_type(
            key, report[key], specs["value_type"], specs.get("extended_metadata")
        )

        if not valid:
            errors.append(error_message)

    # Check for extra keys in the report
    extra_keys = set(report.keys()) - set(required_outputs.keys())
    if extra_keys:
        errors.append(f"Unexpected keys in report: {', '.join(extra_keys)}")

    return errors
