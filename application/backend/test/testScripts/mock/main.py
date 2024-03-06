import os
from typing import Optional
from pydantic import BaseModel
import random


class ExtendedInt(BaseModel):
    value: Optional[int]
    desc: Optional[str]


class ExtendedBool(BaseModel):
    value: Optional[bool]
    desc: Optional[str]


class ExtendedStr(BaseModel):
    value: Optional[str]
    desc: Optional[str]


class Return(BaseModel):
    commits: Optional[int | ExtendedInt]
    total_code_lines: Optional[int | ExtendedInt]
    language: Optional[str | ExtendedStr]
    is_public: Optional[bool | ExtendedBool]
    url: Optional[str | ExtendedStr]
    test_coverage: Optional[int | ExtendedInt]


def main(url: str) -> Return:
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
    url = str(os.getenv("URL"))
    print(main(url).model_dump_json())
