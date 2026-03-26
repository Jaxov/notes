# from fastapi import FastAPI
# from auth.database.database import  Base, engine, async_session
# from sqlalchemy.ext.asyncio import AsyncSession
# from sqlalchemy.future import select

from sqlalchemy import Column, Integer, String, Text
from backend.database.database import Base
from pydantic import BaseModel

class AuthModel(Base):
    __tablename__ = "auth"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100))
    content = Column(Text)


class LoginForm(BaseModel):
    username: str
    password: str

class RegisterForm(BaseModel):
    username: str
    password: str

# class NoteCreate(BaseModel):
#     title: str
#     content: str

# class NoteRead(NoteCreate):
#     id: int

#     class Config:
#         orm_mode = True