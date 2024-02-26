import json
import os
from pydantic import BaseModel
import subprocess


class Return(BaseModel):
    hasHTTPS: bool
    first_contentful_paint: int
    first_meaningful_paint: int
    speed_index: int
    no_redirects: bool
    responsive_images: bool
    has_console_errors: bool


def run_lighthouse(url: str):
    """Function for running the lighthouse command in cmd line"""
    output_file = (
        f"{url.replace('http://', '').replace('https://', '').replace('/', '_')}.json"
    )

    command = [
        "npx",
        "lighthouse",
        url,
        "--output=json",
        f"--output-path={output_file}",
        '--chrome-flags="--headless --no-sandbox"',
    ]
    subprocess.run(command)
    return output_file


def read_lighthouse_report(file_path: str):
    """Function for reading the newly generated report"""
    with open(file_path, "r") as file:
        report = json.load(file)
    return report


def lighthouse_analyzer(url):

    # Run lighthouse and get file name in return
    output_file = run_lighthouse(url)

    # Load newly generated report
    report: json = read_lighthouse_report(output_file)

    cleaned_report = json.dumps(
        {
            "hasHTTPS": (
                True if report["audits"]["is-on-https"]["score"] == 1 else False
            ),
            "first_contentful_paint": report["audits"]["first-contentful-paint"][
                "score"
            ]
            * 100,
            "first_meaningful_paint": report["audits"]["first-meaningful-paint"][
                "score"
            ]
            * 100,
            "speed_index": report["audits"]["speed-index"]["score"] * 100,
            "no_redirects": (
                True if report["audits"]["redirects"]["score"] == 1 else False
            ),
            "responsive_images": (
                True
                if report["audits"]["image-size-responsive"]["score"] == 1
                else False
            ),
            "has_console_errors": (
                True if report["audits"]["errors-in-console"]["score"] == 1 else False
            ),
        }
    )
    return cleaned_report


def main(url: str) -> Return:
    return lighthouse_analyzer(url)


if __name__ == "__main__":
    url = str(os.getenv("URL"))
    print(json.dumps(main(url).model_dump()))
