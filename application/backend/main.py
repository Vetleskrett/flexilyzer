from fastapi import FastAPI
import uvicorn
from api.v1.routers import tasks


app = FastAPI()

app.include_router(tasks.router, tags=["tasks"])

 

if __name__ == "__main__":
   uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True) 