from fastapi import FastAPI
import uvicorn
from api.v1.routers import tasks
from db.session import db
from db.models import (
    Course,
    Assignment,
    Group,
    Repository,
    Analyzer,
    MetricDefinition,
    Report,
)
from db.seed import main as seed_database

# Flush db and recreate with newest version of tables
db.drop_all_tables(with_all_data=True)
db.generate_mapping(create_tables=True)

# Fill the db with example data
seed_database()

# Initialize FastAPI instance
app = FastAPI()


app.include_router(tasks.router, tags=["tasks"])


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
