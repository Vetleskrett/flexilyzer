import os
from typing import Optional
from pydantic import BaseModel
import requests


class Return(BaseModel):
    successsful_response: Optional[bool]
    status_code: Optional[int]


def check_web_server(url):
    resp_obj = {}
    try:
        response = requests.get(url)
        if response.status_code >= 200 and response.status_code < 300:
            resp_obj["successful_response"] = True
        else:
            resp_obj["successful_response"] = False

        resp_obj["status_code"] = response.status_code

    except requests.exceptions.RequestException as e:
        resp_obj["status_code"] = None
        resp_obj["successful_response"] = False
    return resp_obj


def main(url: str) -> Return:
    return Return(**check_web_server(url))


if __name__ == "__main__":
    url = str(os.getenv("URL"))
    print(main(url).model_dump_json())
