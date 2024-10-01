import json
import os
from pydantic import BaseModel
import requests
import re
from typing import Optional
from datetime import datetime


class ExtendedDatetime(BaseModel):
    value: Optional[datetime]
    desc: Optional[str]

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
    name: Optional[str | ExtendedStr]
    owner: Optional[str | ExtendedStr]
    users: Optional[str | ExtendedStr]
    description: Optional[str | ExtendedStr]
    open_issues: Optional[int | ExtendedInt]
    total_commits: Optional[int | ExtendedInt]
    commits_per_user: Optional[str | ExtendedStr]
    untracked_commits: Optional[int | ExtendedInt]
    total_pull_requests: Optional[int | ExtendedInt]
    pushed_at: Optional[datetime | ExtendedDatetime]
    created_at: Optional[datetime | ExtendedDatetime]
    private: Optional[bool | ExtendedBool]
    language: Optional[str | ExtendedStr]
    bytes_of_language: Optional[str | ExtendedStr]


def get_last_page_number(link_header):
    """
    Extract the last page number from the 'Link' header
    """
    if link_header:
        links = link_header.split(", ")
        last_link = [link for link in links if 'rel="last"' in link]
        if last_link:
            match = re.search(r'page=(\d+)>; rel="last"', last_link[0])
            if match:
                return int(match.group(1))
    return 1


def main(url: str, token: str) -> Return:
    # code goes here

    # Extract the owner and repo name from the URL
    parts = url.split("/")
    host_name, owner, repo_name = parts[-3], parts[-2], parts[-1]


    # Construct the API URLs
    repo_api_url = f"https://{host_name}/api/v3/repos/{owner}/{repo_name}"
    contributers_api_url = f"https://{host_name}/api/v3/repos/{owner}/{repo_name}/contributors"
    commits_api_url = f"https://{host_name}/api/v3/repos/{owner}/{repo_name}/commits"
    pulls_api_url = f"https://{host_name}/api/v3/repos/{owner}/{repo_name}/pulls?state=all"
    languages_api_url = f"https://{host_name}/api/v3/repos/{owner}/{repo_name}/languages"


    # Make a request to the GitHub API for repository info
    repo_response = requests.get(repo_api_url, headers={"Authorization" : f"bearer {token}"})
    if repo_response.status_code != 200:
        repo_data = None
    else:
        repo_data = repo_response.json()

    # Make a request to get the total number of commits
    commits_response = requests.get(commits_api_url, params={"per_page": 1}, headers={"Authorization" : f"bearer {token}"})
    if commits_response.status_code != 200:
        total_commits = None
    else:
        total_commits = get_last_page_number(commits_response.headers.get("Link"))

    commits_accounted_for = 0
    commits_per_user = ""
    all_users = ""
    contributers_response = requests.get(contributers_api_url, headers={"Authorization" : f"bearer {token}"})
    if contributers_response.status_code != 200:
        contributers = None
    else:
        contributers = contributers_response.json()
        for contributer in contributers:
            name = contributer["login"]
            total_contributions = contributer["contributions"]
            commits_accounted_for += total_contributions
            if name != "" and commits_per_user != "":
                all_users += ", "
                commits_per_user += ", "
            all_users += name
            commits_per_user += f"{name} : {total_contributions}"

    language_string = ""
    languages_response = requests.get(languages_api_url, headers={"Authorization" : f"bearer {token}"})
    if languages_response.status_code != 200:
        languages = None
    else:
        languages = languages_response.json()
        for language in languages:
            if language_string != "":
                 language_string += ", "
            language_string += language + " : " + str(languages[f"{language}"])

    # Make a request to get the total number of pull requests
    pulls_response = requests.get(pulls_api_url, params={"per_page": 1})
    if pulls_response.status_code != 200:
        total_pull_requests = None
    else:
        total_pull_requests = get_last_page_number(pulls_response.headers.get("Link"))

    my_obj = {
        "name": repo_data["name"],
        "owner": repo_data["owner"]["login"],
        "users": all_users,
        "description": repo_data["description"],
        "open_issues": repo_data["open_issues_count"],
        "total_commits": total_commits,
        "commits_per_user": commits_per_user,
        "untracked_commits": total_commits - commits_accounted_for,
        "total_pull_requests": total_pull_requests,
        "pushed_at": repo_data["pushed_at"],
        "created_at": repo_data["created_at"],
        "private": repo_data["private"],
        "language": repo_data["language"],
        "bytes_of_language": language_string,
    }

    resp = Return(**my_obj)

    return resp


if __name__ == "__main__":
    url = str(os.getenv('URL'))
    token = str(os.getenv('TOKEN'))
    print(main(url, token).model_dump_json())