import json
import os
from pydantic import BaseModel


class Return(BaseModel):
    commits: int
    total_code_lines: int
    language: str
    is_public: bool
    url: str
    test_coverage: int


def main(url: str) -> Return:
    print(f"input is {url}")

    # mocked git data

    response_obj = {
        "commits": 57,
        "total_code_lines": 1248,
        "language": "TypeScript",
        "is_public": False,
        "url": url,
        "test_coverage": 76,
    }

    response = Return(**response_obj)

    return response


if __name__ == "__main__":
    url = os.getenv("URL")
    print(json.dumps(main(url).model_dump()))
