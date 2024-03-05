from typing import List, Set, Tuple
from schemas.analyzer_schema import AnalyzerInputCreate, AnalyzerOutputCreate
from schemas.shared import ValueTypesMapping, ValueTypesOutput, ExtendedTypeMappings, ValueTypesInput



def get_input_params(inputs: List[AnalyzerInputCreate]) -> str:
    return ", ".join([f"{input.key_name}: {ValueTypesMapping[input.value_type.value].value}" for input in inputs])

def get_extended_types_and_classes(outputs: List[AnalyzerOutputCreate]) -> Tuple[Set[str], str]:
    needed_extended_types = set()
    extended_classes = ""
    for output in outputs:
        output_type = ValueTypesMapping[ValueTypesOutput[output.value_type.value].name].value
        needed_extended_types.add(output_type)

    for type_needed in needed_extended_types:
        extended_class_name = ExtendedTypeMappings[type_needed]
        if extended_class_name:
            extended_classes += f"""
class {extended_class_name.value}(BaseModel):
    value: Optional[{type_needed}]
    desc: Optional[str]
"""
    return needed_extended_types, extended_classes

def generate_env_vars(inputs: List[AnalyzerInputCreate]) -> str:
    env_vars = "\n    ".join([
        f"{input.key_name} = {ValueTypesMapping[ValueTypesInput[input.value_type.value].name].value}(os.getenv('{input.key_name.upper()}'))"
        for input in inputs
    ])
    return env_vars

def generate_template(inputs: List[AnalyzerInputCreate], outputs: List[AnalyzerOutputCreate]) -> str:
    input_params = get_input_params(inputs)
    needed_extended_types, extended_classes = get_extended_types_and_classes(outputs)

    output_class_fields = "\n    ".join([
        f"{output.key_name}: Optional[{ValueTypesMapping[ValueTypesOutput[output.value_type.value].name].value} | {ExtendedTypeMappings[ValueTypesMapping[ValueTypesOutput[output.value_type.value].name].value].value}]"
        for output in outputs
    ])

    output_class = f"{extended_classes}\nclass Return(BaseModel):\n    {output_class_fields}" if outputs else ""

    env_vars = generate_env_vars(inputs)

    imports = "import os\nfrom typing import Optional\nfrom pydantic import BaseModel\n"
    if 'datetime' in needed_extended_types:
        imports += "from datetime import datetime\n"
    if any(input.value_type.value == 'zip' for input in inputs):
        imports += "from pathlib import Path\n"

    template = f"""{imports}
{output_class}

def main({input_params}) -> {'Return' if outputs else 'None'}:
    # code goes here
    return

if __name__ == "__main__":
    {env_vars}
    print(main({', '.join([input.key_name for input in inputs])}).model_dump_json())  
"""
    return template