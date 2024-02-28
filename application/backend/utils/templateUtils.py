from typing import List
from schemas.analyzer_schema import AnalyzerInputCreate, AnalyzerOutputCreate
from schemas.shared import ValueTypesMapping, ValueTypesOutput


def generate_template(
    inputs: List[AnalyzerInputCreate], outputs: List[AnalyzerOutputCreate]
):
    input_params = ", ".join(
        [
            f"{input.key_name}: {ValueTypesMapping[input.value_type.value].value}"
            for input in inputs
        ]
    )

    output_class_fields = "\n    ".join(
        [
            f"{output.key_name}: Optional[{ValueTypesMapping[output.value_type.value].value}]"
            for output in outputs
        ]
    )
    output_class = (
        f"class Return(BaseModel):\n    {output_class_fields}" if outputs else ""
    )

    env_vars = "\n    ".join(
        [
            (
                f"{input.key_name} = {ValueTypesMapping[input.value_type.value].value}(os.getenv('{input.key_name.upper()}'))"
            )
            for input in inputs
        ]
    )

    template = f"""import os
from typing import Optional
from pydantic import BaseModel
{'from datetime import datetime' if ValueTypesOutput.date.value in [output.value_type.value for output in outputs] else ""}


{output_class}

def main({input_params}) -> {'Return' if outputs else 'None'}:
    # code goes here
    return

if __name__ == "__main__":
    {env_vars}
    print(main({', '.join([input.key_name for input in inputs])}).model_dump_json())
"""

    return template
