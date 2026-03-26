from sqlalchemy import Column, Integer, String, Text, ForeignKey
from database.database import Base
from pydantic import BaseModel

class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String(100))
    content = Column(Text)


class NoteCreate(BaseModel):
    title: str
    content: str

class NoteRead(NoteCreate):
    id: int
    class Config:
        orm_mode = True