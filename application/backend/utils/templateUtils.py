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

    needed_extended_types = set()
    for output in outputs:
        output_type = ValueTypesMapping[
            ValueTypesOutput[output.value_type.value].name
        ].value
        needed_extended_types.add(output_type)

    extended_classes = ""
    extended_type_mappings = {
        "str": "ExtendedStr",
        "bool": "ExtendedBool",
        "int": "ExtendedInt",
        "datetime": "ExtendedDatetime",
    }
    for type_needed in needed_extended_types:
        extended_class_name = extended_type_mappings[type_needed]
        extended_classes += f"""
class {extended_class_name}(BaseModel):
    value: Optional[{type_needed}]
    desc: Optional[str]
"""

    output_class_fields = "\n    ".join(
        [
            f"{output.key_name}: Optional[{ValueTypesMapping[ValueTypesOutput[output.value_type.value].name].value} | {extended_type_mappings.get(ValueTypesMapping[ValueTypesOutput[output.value_type.value].name].value, '')}]"
            for output in outputs
        ]
    )

    output_class = (
        f"{extended_classes}\nclass Return(BaseModel):\n    {output_class_fields}"
        if outputs
        else ""
    )

    env_vars = "\n    ".join(
        [
            f"{input.key_name} = {ValueTypesMapping[ValueTypesOutput[input.value_type.value].name].value}(os.getenv('{input.key_name.upper()}'))"
            for input in inputs
        ]
    )

    template = f"""import os
from typing import Optional, Union
from pydantic import BaseModel
{'from datetime import datetime' if 'datetime' in needed_extended_types else ''}

{output_class}

def main({input_params}) -> {'Return' if outputs else 'None'}:
    # code goes here
    return

if __name__ == "__main__":
    {env_vars}
    print(main({', '.join([input.key_name for input in inputs])}).model_dump_json())
"""

    return template
