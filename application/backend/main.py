from fastapi import FastAPI
import uvicorn
from api.v1.routers import tasks
from api.v1.routers import courses
from api.v1.routers import assignments


from db.models import (
    Course,
    Assignment,
    Team,
    Repository,
    Analyzer,
    MetricDefinition,
    Report,
)


# Initialize FastAPI instance
app = FastAPI()

from db.session import db


app.include_router(tasks.router, tags=["tasks"])
app.include_router(courses.router, tags=["courses"])
app.include_router(assignments.router, tags=["assignments"])

# db.generate_mapping()


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
