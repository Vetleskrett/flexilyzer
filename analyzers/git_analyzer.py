import requests
from credentials import Credentials

project_id = 17552

branches_url = f"https://gitlab.stud.idi.ntnu.no/api/v4/projects/{project_id}/repository/branches?access_token={Credentials.gitlab_access_token}"
members_url = f"https://gitlab.stud.idi.ntnu.no/api/v4/projects/{project_id}/members?access_token={Credentials.gitlab_access_token}"
commits_url = (
    f"https://gitlab.stud.idi.ntnu.no/api/v4/projects/{project_id}/repository/commits"
)
files_url = (
    f"https://gitlab.stud.idi.ntnu.no/api/v4/projects/{project_id}/repository/tree?recursive=true"
)


def fetch_git(url, params):
    params["access_token"] = Credentials.gitlab_access_token
    git_response = requests.get(url, params=params)

    return git_response


def get_total_count(url):
    total_count = 0
    page = 1
    per_page = 100

    while True:
        response = fetch_git(url, {"per_page": per_page, "page": page})

        if response.status_code == 200:
            items = response.json()
            total_count += len(items)

        # Check if more commits to fetch
        if len(items) < per_page:
            break

        page += 1

    return total_count


if __name__ == "__main__":
    num_commits = get_total_count(commits_url)
    num_files = get_total_count(files_url)

    print(num_commits)
    print(num_files)
