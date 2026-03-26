# from fastapi import FastAPI
# from auth.database.database import  Base, engine, async_session
# from sqlalchemy.ext.asyncio import AsyncSession
# from sqlalchemy.future import select

from sqlalchemy import Column, Integer, String, Text, Boolean
from database.database import Base
from pydantic import BaseModel

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=False, nullable=True)
    email = Column(String(100), unique=True, nullable=True, index=True)
    hashed_password = Column(Text, nullable=False)
    is_active = Column(Boolean, default=True)
# class NoteCreate(BaseModel):
#     title: str
#     content: str

# class NoteRead(NoteCreate):
#     id: int

#     class Config:
#         orm_mode = True