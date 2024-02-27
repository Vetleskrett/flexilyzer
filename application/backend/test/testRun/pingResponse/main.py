import json
import os
from pydantic import BaseModel
import requests


class Return(BaseModel):
    successful_response: bool
    status_code: int


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
        resp_obj["status_code"] = 504
        resp_obj["successful_response"] = False
    return resp_obj


def main(url: str) -> Return:
    return Return(**check_web_server(url))


if __name__ == "__main__":
    url = str(os.getenv("URL"))
    print(json.dumps(main(url).model_dump()))
