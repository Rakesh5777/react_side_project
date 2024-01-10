from typing import Dict
from fastapi import APIRouter
import random
from .BodyModels.models import  UserAddBody, UserRemoveBody

router = APIRouter()

users = [
 {
      "slNo": "1",
      "firstName": "David",
      "lastName": " Copperfield",
      "email": "david96copperfield@email.com",
      "roleId": "1",
      "teamId": "2",
      "createdOn": "02/17/2023",
      "lastLogin": "09/17/2023",
    },
    {
    "slNo": "2",
      "firstName": "David",
      "lastName": " Copperfield",
      "email": "david96copperfield@email.com",
      "roleId": "1",
      "teamId": "2",
      "createdOn": "02/17/2023",
      "lastLogin": "09/17/2023",
    },
    {
    "slNo": "3",
      "firstName": "David",
      "lastName": " Copperfield",
      "email": "david96copperfield@email.com",
      "roleId": "1",
      "teamId": "1",
      "createdOn": "02/17/2023",
      "lastLogin": "09/17/2023",
    },
]

@router.get("/users", summary="Get all available user details")
async def get_users():
    return {"user_details": users}


@router.delete("/remove_users", summary="Remove all available user details")
async def remove_users(users:Dict):
    print(users)
    return {"message": 'success'}

@router.post("/add_user", summary="To add user data")
async def add_user(user:Dict):
    print(user)
    return {"user_detail": user}

@router.put("/update_user", summary="To update user data")
async def update_user(user:Dict):
    print(user)
    return {"user_detail": user}