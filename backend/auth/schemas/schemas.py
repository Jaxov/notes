from pydantic import BaseModel

class UserRegister(BaseModel):
    email: str
    password: str

class RegisterFormRead(BaseModel):
    id: int
    email: str

    class Config:
        orm_mode = True


class UserLogin(BaseModel):
    username: str
    password: str

class LoginFormRead(BaseModel):
    access_token: str
    token_type: str

