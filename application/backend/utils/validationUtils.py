from fastapi import HTTPException
from pydantic import ValidationError
import json
from schemas.shared import ValueTypesOutput


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

    if expected_type == ValueTypesOutput.range:
        if not isinstance(value, (int, float)):
            return False, f"{base_error_msg}, got {type(value).__name__}"

        if "fromRange" in extended_metadata and "toRange" in extended_metadata:
            if not (
                extended_metadata["fromRange"] <= value <= extended_metadata["toRange"]
            ):
                # Provide a detailed error message for range violations
                return False, (
                    f"Value for key '{key}' ({value}) is outside the allowed range "
                    f"[{extended_metadata['fromRange']}, {extended_metadata['toRange']}]"
                )
        # If the value is within the range or no range is specified, consider it valid
        return True, ""
    elif expected_type == ValueTypesOutput.int:
        return (
            isinstance(value, (int, float)),
            f"{base_error_msg}, got {type(value).__name__}",
        )
    elif expected_type == ValueTypesOutput.bool:
        return isinstance(value, bool), f"{base_error_msg}, got {type(value).__name__}"
    elif expected_type == ValueTypesOutput.str:
        return isinstance(value, str), f"{base_error_msg}, got {type(value).__name__}"
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
