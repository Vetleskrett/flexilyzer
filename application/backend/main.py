from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from api.v1.routers import (
    courses,
    assignments,
    test,
    teams,
    reports,
    projects,
    analyzers,
)
from db.database import engine
from db import models


models.Base.metadata.create_all(bind=engine)

# Initialize FastAPI instance
app = FastAPI()

# TODO: fix for prod
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


app.include_router(test.router, tags=["tests"])
app.include_router(courses.router, tags=["courses"])
app.include_router(assignments.router, tags=["assignments"])
app.include_router(teams.router, tags=["teams"])
app.include_router(projects.router, tags=["projects"])
app.include_router(reports.router, tags=["reports"])
app.include_router(analyzers.router, tags=["analyzers"])


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
