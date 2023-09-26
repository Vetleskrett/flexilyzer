import requests
from credentials import Credentials
from datetime import datetime

from pydantic import BaseModel
from typing import Dict, List, Optional

import json


# class UserCommitsData(BaseModel):
#     username: str
#     num_commits: int


# project_id = 17552
project_id = 72724

# branches_url = f"https://gitlab.stud.idi.ntnu.no/api/v4/projects/{project_id}/repository/branches?access_token={Credentials.gitlab_access_token}"
# members_url = f"https://gitlab.stud.idi.ntnu.no/api/v4/projects/{project_id}/members?access_token={Credentials.gitlab_access_token}"
# files_url = f"https://gitlab.stud.idi.ntnu.no/api/v4/projects/{project_id}/repository/tree?recursive=true"


commits_url = f"https://gitlab.com/api/v4/projects/{project_id}/repository/commits"
# members_url = f"https://gitlab.com/api/v4/projects/{project_id}/repository/commits"


def fetch_git(url, params):
    # params["access_token"] = Credentials.gitlab_access_token
    git_response = requests.get(url, params=params)

    return git_response


def get_total_count(url):
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

    return total_count, commits_per_user, commits_per_day




# if __name__ == "__main__":
#     num_commits, commits_per_day, commits_per_user = get_total_count(commits_url)
#     # num_files = get_total_count(files_url)

#     print(num_commits)
#     print(json.dumps(commits_per_user, indent=4))
#     print(json.dumps(commits_per_day, indent=4))
#     # print(num_files)
