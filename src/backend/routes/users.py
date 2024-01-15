from typing import Dict
from fastapi import APIRouter,Body
import uuid

router = APIRouter()

totalUsers = []

@router.get("/users", summary="Get all available user details")
async def get_users():
    return {"user_details": totalUsers}

@router.post("/add_user", summary="To add user data")
async def add_user(user:Dict):
    print(user)
    user_id = str(uuid.uuid4())  # Generate a unique identifier for the user
    user["id"] = user_id  # Add the unique identifier to the user dictionary
    totalUsers.append(user)
    return {"user_detail": user}

@router.delete("/remove_users", summary="Remove all available user details")
async def remove_users(users: Dict):
    global totalUsers #To access the global variable

    print(users)
    totalUsers = [user for user in totalUsers if user not in users.get("users", [])]
    return {"success": True}

@router.put("/update_user", summary="To update user data")
async def update_user(updated_user: Dict = Body(...)):
    print(updated_user)
    for userData in totalUsers:
        if userData.get('id') == updated_user.get('id'):
            userData.update(updated_user)
            return {"message": "User updated successfully"}
    raise HTTPException(status_code=404, detail="User not found")