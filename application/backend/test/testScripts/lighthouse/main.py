import json
import os
from typing import Optional
from pydantic import BaseModel
import subprocess
import pathlib


class Return(BaseModel):
    hasHTTPS: Optional[bool]
    first_contentful_paint: Optional[int]
    first_meaningful_paint: Optional[int]
    speed_index: Optional[int]
    no_redirects: Optional[bool]
    responsive_images: Optional[bool]
    has_console_errors: Optional[bool]


def run_lighthouse(url: str):
    """Function for running the lighthouse command in cmd line"""
    output_file = (
        f"{url.replace('http://', '').replace('https://', '').replace('/', '_')}.json"
    )

    if not url.startswith("https://"):
        url = "https://" + url

    command = [
        "npx",
        "lighthouse",
        url,
        "--quiet",
        "--output=json",
        f"--output-path={output_file}",
        '--chrome-flags="--headless --no-sandbox"',
    ]
    subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
    return output_file


def read_lighthouse_report(file_path: str):
    """Function for reading the newly generated report"""
    with open(file_path, "r") as file:
        report = json.load(file)

    pathlib.Path(file_path).unlink()

    return report


def safe_int(value, multiplier=100):
    """Safely convert a value to an int, applying a multiplier, or return None if conversion is not possible."""
    try:
        return int(value * multiplier)
    except (TypeError, ValueError):
        return 0


def lighthouse_analyzer(url):
    # Assuming run_lighthouse and read_lighthouse_report are defined elsewhere
    output_file = run_lighthouse(url)  # Run lighthouse and get file name in return
    report = read_lighthouse_report(output_file)  # Load newly generated report

    # Safely extract and convert report values, defaulting to None on failure
    cleaned_report = {
        "hasHTTPS": report.get("audits", {}).get("is-on-https", {}).get("score") == 1,
        "first_contentful_paint": safe_int(
            report.get("audits", {}).get("first-contentful-paint", {}).get("score")
        ),
        "first_meaningful_paint": safe_int(
            report.get("audits", {}).get("first-meaningful-paint", {}).get("score")
        ),
        "speed_index": safe_int(
            report.get("audits", {}).get("speed-index", {}).get("score")
        ),
        "no_redirects": report.get("audits", {}).get("redirects", {}).get("score") == 1,
        "responsive_images": report.get("audits", {})
        .get("image-size-responsive", {})
        .get("score")
        == 1,
        "has_console_errors": report.get("audits", {})
        .get("errors-in-console", {})
        .get("score")
        == 1,
    }

    # Assuming Return is a constructor for a result object
    return Return(**cleaned_report)


def main(url: str) -> Return:
    return lighthouse_analyzer(url)


if __name__ == "__main__":
    url = str(os.getenv("URL"))
    print(main(url).model_dump_json())
