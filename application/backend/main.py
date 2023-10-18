from fastapi import FastAPI
import uvicorn
from api.v1.routers import tasks
from api.v1.routers import courses

from db.session import db

# Initialize FastAPI instance
app = FastAPI()


app.include_router(tasks.router, tags=["tasks"])
app.include_router(courses.router, tags=["courses"])

# db.generate_mapping()


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
