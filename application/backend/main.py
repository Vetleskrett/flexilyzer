from fastapi import FastAPI

from celery.task import celery_task

app = FastAPI()


@app.post("/run_script/")
async def run_script(project_id: int, analyzer_id: int):
    ## Find needed params for given analyzer and project id in DB

    ## Dummy data
    script = "test/path"
    venv = "test/path"
    param_list = [
        {"github": "www.github.com/example"},
        {"github": "www.github.com/example2"},
        {"github": "www.github.com/example3"},
    ]

    celery_task.apply_async(
        script_path=script, requirements_path=venv, analyzer_args=param_list
    )
    return {"message": "Task started"}
