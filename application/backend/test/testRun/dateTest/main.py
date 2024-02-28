import json
import os
from typing import Optional
from pydantic import BaseModel
from datetime import datetime
import random


class Return(BaseModel):
    datetimenow: Optional[datetime]


def generate_random_date(start_year: int, end_year: int) -> datetime:
    start_timestamp = datetime(year=start_year, month=1, day=1).timestamp()
    end_timestamp = datetime(
        year=end_year, month=12, day=31, hour=23, minute=59, second=59
    ).timestamp()

    random_timestamp = random.randint(int(start_timestamp), int(end_timestamp))

    random_date = datetime.fromtimestamp(random_timestamp)

    return random_date


def main(url: str):
    random_date = generate_random_date(1970, 2028)
    return Return(**{"datetimenow": random_date})


if __name__ == "__main__":
    url = str(os.getenv("URL"))
    print(json.dumps(main(url).model_dump()))
