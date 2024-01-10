from fastapi import APIRouter
import random
from .BodyModels.models import PostConnectionsBody, PostArnValidationBody, PostConnectionBody

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
    {
    "id": 3,
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
  {
    "id": 4,
    "name": "Lorem ipsum dolor sit amet",
    "project_id": "ABC-XYZ-12345",
    "cloud_provider": "AWS",
    "connection_type": "Partner",
    "created_date": "11/05/2023",
    "created_by": "John Doe",
    "last_checked": "11/05/2023",
    "last_success": "03/22/2023 - 10:30 CST",
    "account_type": "Receiver",
    "connection_status": "success",
    "child_connections": [],
    "expand": False
  },
  {
    "id": 5,
    "name": "Adipiscing elit sed do eiusmod",
    "project_id": "XYZ-789-67890",
    "cloud_provider": "Azure",
    "connection_type": "Vendor",
    "created_date": "12/12/2023",
    "created_by": "Alice Johnson",
    "last_checked": "12/12/2023",
    "last_success": "04/14/2023 - 15:45 CST",
    "account_type": "Payer",
    "connection_status": "failed",
    "child_connections": [],
    "expand": False
  },
  {
    "id": 6,
    "name": "Sit amet consectetur adipiscing",
    "project_id": "LMN-PQR-98765",
    "cloud_provider": "GCP",
    "connection_type": "Customer",
    "created_date": "01/25/2024",
    "created_by": "Bob Smith",
    "last_checked": "01/25/2024",
    "last_success": "05/08/2023 - 12:00 CST",
    "account_type": "Receiver",
    "connection_status": "success",
    "child_connections": [],
    "expand": False
  },
  {
    "id": 7,
    "name": "Elit sed do eiusmod tempor",
    "project_id": "PQR-XYZ-56789",
    "cloud_provider": "AWS",
    "connection_type": "Partner",
    "created_date": "02/18/2024",
    "created_by": "Eva Thompson",
    "last_checked": "02/18/2024",
    "last_success": "06/03/2023 - 18:20 CST",
    "account_type": "Payer",
    "connection_status": "failed",
    "child_connections": [],
    "expand": False
  }
]

@router.post("/connections", summary="Get all available connection_resource")
async def get_connections(body:PostConnectionsBody):
    print(body.model_dump_json())
    random_index = random.randint(0, len(connections) - 1)
    return {"connections_detail": connections}


@router.post("/arn_validation", summary="Get all available connection_resource")
async def arn_validation(item:PostArnValidationBody):
    print(item)
    valid = [True, False]
    random_index = random.randint(0, len(valid) - 1)
    return {"arn_valid": True}

@router.post("/test_connection", summary="Get all available connection_resource")
async def test_connection(item:PostConnectionBody):
    print(item)
    valid = [True, False]
    random_index = random.randint(0, len(valid) - 1)
    return {"test_result": valid[random_index]}

@router.delete("/remove_connection",summary="TO delete a connection")
async def remove_connection(id:str=None):
    print(id)
    return True