from pydantic import BaseModel

class PostConnectionsBody(BaseModel):
    test:str

class PostArnValidationBody(BaseModel):
    arn:str

class PostConnectionBody(BaseModel):
    connection:object

class UserRemoveBody(BaseModel):
    user: object

class UserAddBody(BaseModel):
    user: object