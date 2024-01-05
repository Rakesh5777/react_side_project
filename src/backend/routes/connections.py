from fastapi import APIRouter
import random
from .BodyModels.connectionsModel import PostConnectionsBody

router = APIRouter()

connections = [
  {
    "id": 70,
    "name": "Lorem ipsum dolor sit",
    "project_id": "NHJ-KLP-90897",
    "cloud_provider": "AWS",
    "connection_type": "Wayam",
    "created_date": "02/17/2023",
    "created_by": "Mike White",
    "last_checked": "02/17/2023",
    "last_success": "02/17/2023 - 08:15 CST",
    "account_type": "Root",
    "connection_status": "success",
    "child_connections": [
      {
        "id": 80,
        "name": "child",
        "project_id": "ABC-KLP-90898",
        "cloud_provider": "AWS",
        "connection_type": "Wayam",
        "created_date": "05/19/2023",
        "created_by": "Summer Greek",
        "last_checked": "06/20/2023",
        "last_success": "06/20/2023 - 08:15 CST",
        "account_type": "Production",
        "connection_status": "success",
      },
    ],
    "expand": False,
  },
  {
    "id": 90,
    "name": "Dolor sit amet consectetur",
    "project_id": "KLP-NHJ-34512",
    "cloud_provider": "GCP",
    "connection_type": "Customer",
    "created_date": "10/01/2023",
    "created_by": "Jannel Rubben",
    "last_checked": "10/01/2023",
    "last_success": "02/17/2023 - 08:15 CST",
    "account_type": "Payer",
    "connection_status": "failed",
    "child_connections": [],
    "expand": False,
  },
]

@router.post("/connections", summary="Get all available connection_resource")
async def get_connections(body:PostConnectionsBody):
    print(body.model_dump_json())
    random_index = random.randint(0, len(connections) - 1)
    return {"connections_detail": connections}


@router.get("/arn_validation", summary="Get all available connection_resource")
async def arn_validation():
    valid = [True, False]
    random_index = random.randint(0, len(valid) - 1)
    return {"arn_valid": valid[random_index]}