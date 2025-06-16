from pydantic import BaseModel

class User(BaseModel):
    username: str
    email: str
    full_name: str | None = None
    role: str = "user"
    

class UserCreate(User):
    password: str
    
class UserUpdate(BaseModel):
    username: str | None = None
    email: str | None = None
    full_name: str | None = None
    password: str | None = None
    role: str | None = None
    
class UserInDB(User):
    userid: int
    hashed_password: str
    
class UserResponse(User):
    userid: int