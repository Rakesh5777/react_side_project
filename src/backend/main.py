from fastapi import FastAPI
import random
from fastapi.middleware.cors import CORSMiddleware
from routes import connections, optimizations

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(connections.router)
app.include_router(optimizations.router)





#To run the server in a new terminal, navigate to ./src/backend
# 1. run -> pip3 install -r requirements.txt
# 2. run-> uvicorn main:app  --reload