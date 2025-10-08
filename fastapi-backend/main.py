from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from services.db_service import init_db
from endpoints import auth_endpoints, team_endpoints, tona_endpoints, user_endpoints, data_endpoints
load_dotenv()


app = FastAPI()
init_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_ORIGINS", "").strip().split(","),  # Adjust this to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_endpoints.router, prefix="/auth")
app.include_router(team_endpoints.router, prefix="/team")
app.include_router(tona_endpoints.router, prefix="/tona")
app.include_router(user_endpoints.router, prefix="/user")
app.include_router(data_endpoints.router, prefix="/data")

@app.get("/", status_code=status.HTTP_200_OK)
async def root():
  return { "message": "Welcome to TonaManager backend systems!" }