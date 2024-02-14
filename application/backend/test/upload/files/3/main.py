import json
import os
from pydantic import BaseModel
import random


class Return(BaseModel):
    commits: int
    total_code_lines: int
    language: str
    is_public: bool
    url: str
    test_coverage: int


def main(url: str) -> Return:
    # mocked git data

    response_obj = {
        "commits": random.randint(8, 40),
        "total_code_lines": random.randint(500, 5000),
        "language": random.choice(["TypeScript", "Python", "Java", "JavaScript"]),
        "is_public": random.choice([True, False]),
        "url": url,
        "test_coverage": random.randint(0, 100),
    }

    response = Return(**response_obj)

    return response


if __name__ == "__main__":
    url = os.getenv("URL")
    print(json.dumps(main(url).model_dump()))
