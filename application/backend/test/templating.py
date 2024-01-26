def generate_template(inputs, outputs):
    input_params = ", ".join([f"{name}: {type}" for name, type in inputs.items()])

    output_class_fields = "\n    ".join(
        [f"{name}: {type}" for name, type in outputs.items()]
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


# Example usage
inputs = {"arga": "int", "argb": "str"}  # User provided input arguments
outputs = {
    "arg1": "str",
    "arg2": "int",
    "arg3": "dict",
    "arg4": "list",
}  # User provided output arguments

print(generate_template(inputs, outputs))
