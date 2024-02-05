import json
import os
from pydantic import BaseModel


class Return(BaseModel):
    b: str


def main(a: str) -> Return:
    string = f"input is {a}, this is my output"

    response = Return(**{"b": string})

    return response


if __name__ == "__main__":
    a = os.getenv("A")
    print(json.dumps(main(a).model_dump()))
