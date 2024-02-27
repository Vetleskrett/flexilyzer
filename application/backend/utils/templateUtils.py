import random
import string
from typing import List
from schemas.analyzer_schema import AnalyzerInputCreate, AnalyzerOutputCreate
from schemas.shared import ValueTypesMapping


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

    template = f"""import json
import os
from typing import Optional
from pydantic import BaseModel


{output_class}

def main({input_params}) -> {'Return' if outputs else 'None'}:
    # code goes here
    return

if __name__ == "__main__":
    {env_vars}
    print(json.dumps(main({', '.join([input.key_name for input in inputs])}).model_dump()))
"""

    return template


def generate_random_website():
    # Generate a random string of lowercase letters with a length between 5 and 10
    length = random.randint(5, 10)
    random_string = "".join(
        random.choice(string.ascii_lowercase) for _ in range(length)
    )

    # Construct the website URL
    website = f"www.{random_string}.com"

    return website
