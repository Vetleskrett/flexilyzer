from typing import List
from schemas.analyzer_schema import AnalyzerInputCreate, AnalyzerOutputCreate


def generate_template(
    inputs: List[AnalyzerInputCreate], outputs: List[AnalyzerOutputCreate]
):
    input_params = ", ".join(
        [f"{input.key_name}: {input.value_type}" for input in inputs]
    )

    output_class_fields = "\n    ".join(
        [f"{output.key_name}: {output.value_type}" for output in outputs]
    )
    output_class = (
        f"class Return(BaseModel):\n    {output_class_fields}" if outputs else ""
    )

    env_vars = "\n    ".join(
        [
            f"{name} = {type}(os.getenv('{name.upper()}'))"
            if type in ["int", "float"]
            else f"{name} = os.getenv('{name.upper()}')"
            for name, type in inputs.items()
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
    print(json.dumps(main({', '.join(inputs.keys())}), default=str))
"""

    return template
