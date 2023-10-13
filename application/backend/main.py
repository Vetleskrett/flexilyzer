from fastapi import FastAPI
from api.api_v1.endpoints import tasks


app = FastAPI()

app.include_router(tasks.router, tags=["tasks"])
