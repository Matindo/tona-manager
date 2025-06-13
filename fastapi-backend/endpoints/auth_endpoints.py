from fastapi import APIRouter, HTTPException
from models.user import User
from models.auth import UserCredentials

router = APIRouter()

@router.post("/register")
async def register_user(user: User):
    """
    Register a new user.
    This endpoint takes user data and creates a new user in the database.
    """
    try:
        # Check if the user already exists
        existing_user = await get_user_by_username(user.username)
        if existing_user:
            return {"error": "Username already exists"}
        # Hash the password and save the user and credentials to the database
        hashed_password = hash_password(user.password)
        user_data = User(id=user.id, username=user.username, email=user.email, full_name=user.firstName + " " + user.lastName, disabled=False, role="official")
        cred_data = UserCredentials(username=user.username, password=hashed_password)
        # Save user_data and cred_data to the database
        await save_user_to_db(user_data)
        await save_credentials_to_db(cred_data)
        return {"message": "User registered successfully", "user": user}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.post("/login")
async def signin_user(cred: UserCredentials):
    """
    Sign in a user.
    This endpoint takes user credentials and returns a token if the credentials are valid.
    """
    try:
        # Verify the credentials against the database
        user = await verify_user_credentials(cred.username, cred.password)
        if not user:
            return {"error": "Invalid credentials"}
        token = await create_access_token(data={"username": user.username, "role": user.role, "email": user.email})
        return {"access_token": token, "token_type": "bearer"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/logout")
async def logout(token: str):
    """
    Log out a user.
    This endpoint invalidates the user's token.
    """
    try:
        # Invalidate the token
        await invalidate_token(token)
        return {"message": "User logged out successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
