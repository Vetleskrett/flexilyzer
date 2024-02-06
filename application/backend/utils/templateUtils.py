from typing import List
from schemas.analyzer_schema import AnalyzerInputCreate, AnalyzerOutputCreate
from schemas.shared import ValueTypes


def generate_template(
    inputs: List[AnalyzerInputCreate], outputs: List[AnalyzerOutputCreate]
):
    input_params = ", ".join(
        [f"{input.key_name}: {input.value_type}" for input in inputs]
    )

    output_class_fields = "\n    ".join(
        [
            f"{output.key_name}: {output.value_type.value if output.value_type != ValueTypes.range else ValueTypes.int.value}"
            for output in outputs
        ]
    )
    output_class = (
        f"class Return(BaseModel):\n    {output_class_fields}" if outputs else ""
    )

    env_vars = "\n    ".join(
        [
            (
                f"{input.key_name} = {input.value_type}(os.getenv('{input.key_name.upper()}'))"
                if input.value_type in ["int", "bool"]
                else f"{input.key_name} = os.getenv('{input.key_name.upper()}')"
            )
            for input in inputs
        ]
    )

    template = f"""import json
import os
from pydantic import BaseModel

{output_class}

def main({input_params}) -> {'Return' if outputs else 'None'}:
    # code goes here
    return

if __name__ == "__main__":
    {env_vars}
    print(json.dumps(main({', '.join([input.key_name for input in inputs])})))
"""

    return template
