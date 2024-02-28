import json
import os
from pydantic import BaseModel
import requests
import re
from typing import Optional
from datetime import datetime


class Return(BaseModel):
    name: Optional[str]
    owner: Optional[str]
    description: Optional[str]
    stars: Optional[int]
    forks: Optional[int]
    open_issues: Optional[int]
    total_commits: Optional[int]
    total_pull_requests: Optional[int]
    pushed_at: Optional[datetime]
    private: Optional[bool]
    language: Optional[str]
    license: Optional[str]
    size: Optional[int]


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


def main(url: str) -> Return:
    # code goes here

    # Extract the owner and repo name from the URL
    parts = url.split("/")
    owner, repo_name = parts[-2], parts[-1]

    # Construct the API URLs
    repo_api_url = f"https://api.github.com/repos/{owner}/{repo_name}"
    commits_api_url = f"https://api.github.com/repos/{owner}/{repo_name}/commits"
    pulls_api_url = f"https://api.github.com/repos/{owner}/{repo_name}/pulls?state=all"

    # Make a request to the GitHub API for repository info
    repo_response = requests.get(repo_api_url)
    if repo_response.status_code != 200:
        return {
            "Error": f"GitHub API responded with status code {repo_response.status_code} for repo info"
        }

    repo_data = repo_response.json()

    # Make a request to get the total number of commits
    commits_response = requests.get(commits_api_url, params={"per_page": 1})
    if commits_response.status_code != 200:
        total_commits = None
    else:
        total_commits = get_last_page_number(commits_response.headers.get("Link"))

    # Make a request to get the total number of pull requests
    pulls_response = requests.get(pulls_api_url, params={"per_page": 1})
    if pulls_response.status_code != 200:
        total_pull_requests = None
    else:
        total_pull_requests = get_last_page_number(pulls_response.headers.get("Link"))

    my_obj = {
        "name": repo_data["name"],
        "owner": repo_data["owner"]["login"],
        "description": repo_data["description"],
        "stars": repo_data["stargazers_count"],
        "forks": repo_data["forks_count"],
        "open_issues": repo_data["open_issues_count"],
        "total_commits": total_commits,
        "total_pull_requests": total_pull_requests,
        "pushed_at": repo_data["pushed_at"],
        "private": repo_data["private"],
        "language": repo_data["language"],
        "license": repo_data["license"]["name"],
        "size": repo_data["size"],
    }

    resp = Return(**my_obj)

    return resp


if __name__ == "__main__":
    url = str(os.getenv("URL"))
    print(main(url).model_dump_json())
