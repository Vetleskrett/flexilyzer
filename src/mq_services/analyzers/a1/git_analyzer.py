import requests
from datetime import datetime
from typing import Dict
import json

import mq

project_id = 72724

def fetch_git(url, params):
    git_response = requests.get(url, params=params)

    return git_response


@mq.consumer("analyzer")
@mq.publisher("done")
def get_total_count(project_id):
    '''Example function for analyzing gitlab repo'''

    project_id = project_id.decode()
    url = f"https://gitlab.com/api/v4/projects/{project_id}/repository/commits"
    total_count = 0
    page = 1
    per_page = 100

    commits_per_day: Dict[str:int] = {}
    commits_per_user: Dict[str:int] = {}

    while True:
        response = fetch_git(url, {"per_page": per_page, "page": page})

        if response.status_code == 200:
            items = response.json()
            total_count += len(items)
            print(total_count)
            for commit in items:
                author_name = commit.get("author_name")
                authored_date = commit.get("authored_date")

                # Update the commits_per_user dictionary
                if author_name:
                    commits_per_user[author_name] = (
                        commits_per_user.get(author_name, 0) + 1
                    )

                # Parse the authored_date string to a datetime object and format it to keep only the date part
                if authored_date:
                    date_obj = datetime.strptime(
                        authored_date, "%Y-%m-%dT%H:%M:%S.%f%z"
                    )
                    date_str = date_obj.strftime("%Y-%m-%d")

                    # Update the commits_per_day dictionary

                    commits_per_day[date_str] = commits_per_day.get(date_str, 0) + 1

        # Check if more commits to fetch
        if len(items) < per_page:
            break

        page += 1


    report = json.dumps({"total count": total_count, "commits per user": commits_per_user, "commits per day": commits_per_day})

    return report


