from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from api.v1.routers import (
    courses,
    assignments,
    teams,
    reports,
    projects,
    analyzers,
    jobs,
    batches,
)
from db.database import engine
from db import models


models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# TODO: fix for prod
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

app.include_router(courses.router, tags=["courses"])
app.include_router(assignments.router, tags=["assignments"])
app.include_router(teams.router, tags=["teams"])
app.include_router(projects.router, tags=["projects"])
app.include_router(reports.router, tags=["reports"])
app.include_router(analyzers.router, tags=["analyzers"])
app.include_router(jobs.router, tags=["jobs"])
app.include_router(batches.router, tags=["batches"])


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
