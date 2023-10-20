from fastapi import FastAPI
import uvicorn
from api.v1.routers import tasks, courses, assignments
from db.database import SessionLocal, engine
from db import models


models.Base.metadata.create_all(bind=engine)


# # Dependency
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()


# Initialize FastAPI instance
app = FastAPI()


app.include_router(tasks.router, tags=["tasks"])
app.include_router(courses.router, tags=["courses"])
app.include_router(assignments.router, tags=["assignments"])


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
