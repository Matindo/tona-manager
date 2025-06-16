from fastapi import FastAPI, status
from endpoints import auth_endpoints, team_endpoints, tona_endpoints, user_endpoints

app = FastAPI()

app.include_router(auth_endpoints.router, prefix="/auth")
app.include_router(team_endpoints.router, prefix="/team")
app.include_router(tona_endpoints.router, prefix="/tona")
app.include_router(user_endpoints.router, prefix="/user")

@app.get("/", status_code=status.HTTP_200_OK)
async def root():
  return { "message": "Welcome to TonaManager backend systems!" }