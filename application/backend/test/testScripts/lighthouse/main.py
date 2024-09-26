import json
import os
from typing import Optional
from pydantic import BaseModel
import subprocess


class ExtendedInt(BaseModel):
    value: Optional[int]
    desc: Optional[str]


class ExtendedStr(BaseModel):
    value: Optional[str]
    desc: Optional[str]


class Return(BaseModel):
    frontend_url: Optional[str | ExtendedStr]
    performance: Optional[int | ExtendedInt]
    accessibility: Optional[int | ExtendedInt]
    best_practices: Optional[int | ExtendedInt]
    report: Optional[str | ExtendedStr]


def run_lighthouse(url: str, output_path: str):
    """Function for running the lighthouse command in cmd line"""

    command = [
        "npx",
        "lighthouse",
        url,
        "--quiet",
        "--output=json,html",
        f"--output-path={output_path}",
        '--chrome-flags="--headless --no-sandbox"',
    ]
    subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)


def read_lighthouse_report(file_path: str):
    """Function for reading the newly generated report"""
    with open(file_path, "r") as file:
        report = json.load(file)

    return report


def main(team_nr: int) -> Return:
    frontend_url = f"http://it2810-{str(team_nr).zfill(2)}.idi.ntnu.no/project1/"
    output_path = f"team{team_nr}"
    json_path = f"{output_path}.report.json"
    html_path = f"{output_path}.report.html"

    run_lighthouse(frontend_url, output_path)
    report = read_lighthouse_report(json_path)

    performance = 100 * report["categories"]["performance"]["score"]
    accessibility = 100 * report["categories"]["accessibility"]["score"]
    best_practices = 100 * report["categories"]["best-practices"]["score"]

    return Return(
        frontend_url=frontend_url,
        performance=performance,
        accessibility=accessibility,
        best_practices=best_practices,
        report=html_path
    )

if __name__ == "__main__":
    team_nr = str(os.getenv("TEAM_NR"))
    print(main(team_nr).model_dump_json())
