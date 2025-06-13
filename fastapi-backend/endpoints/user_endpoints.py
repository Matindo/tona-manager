from fastapi import APIRouter, HTTPException
from models.user import User

router = APIRouter()

@router.get("/getAllUsers")
async def get_users():
    """
    Retrieve all users.
    This endpoint returns a list of all registered users in the system.
    """
    try:
        users = get_all_users()
        return {"users": users}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/{user_id}")
async def get_user(user_id: int):
    """
    Retrieve a user by ID.
    This endpoint returns the details of a user specified by their ID.
    """
    try:
        user = get_user_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return {"user": user}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/updateUser")
async def update_user(user: User):
    """
    Update user details.
    This endpoint allows updating user information such as username, email, and role.
    """
    try:
        updated_user = change_user(user)
        return {"message": "User updated successfully", "user": updated_user}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.put("/changePassword")
async def change_password(user: dict):
    """
    Change user password.
    This endpoint allows changing the password of a user.
    """
    try:
        change_user_password(user.id, user.oldPassword, user.newPassword)
        return {"message": "Password changed successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/{user_id}")
async def delete_user(user_id: int):
    """
    Delete a user.
    This endpoint allows deleting a user by their ID.
    """
    try:
        remove_user(user_id)
        return {"message": "User deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/promote")
async def promote_user(user_id: int):
    """
    Promote a user to a higher role.
    This endpoint allows promoting a user to a higher role, such as from user to official.
    """
    try:
        raise_role_level(user_id)
        return {"message": "User promoted successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/demote")
async def demote_user(user_id: int):
    """
    Demote a user to a lower role.
    This endpoint allows demoting a user to a lower role, such as from official to user.
    """
    try:
        lower_role_level(user_id)
        return {"message": "User demoted successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))