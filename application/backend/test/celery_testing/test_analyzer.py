import json


def main():
    # report = json.dumps({"param1": True, "param2": "hello world", "param3": 42})

    report = json.dumps(
        {
            "performance": 76,
            "hasViewport": True,
            "hasHTTPS": False,
            "js_workload": "Good!!",
        }
    )
    return report


if __name__ == "__main__":
    print(main())


import json
import os
from pydantic import BaseModel


class Return(BaseModel):
    ARGB: str


def main(arg: int) -> Return:
    # code goes here

    return


if __name__ == "__main__":
    arga = int(os.getenv("ARGA"))

    print(json.dumps(main(arga)))
