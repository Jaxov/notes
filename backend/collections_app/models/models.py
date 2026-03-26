from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, func
from database.database import Base
from datetime import datetime
from pydantic import BaseModel

class Collection(Base):
    __tablename__ = "collections"

    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    name = Column(String(100), nullable=False)
    # description = Column(Text, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )
 
class CollectionCreate(BaseModel):
    name: str

class CollectionRead(CollectionCreate):
    id: int
    name:str 
    created_at: datetime
    class Config:
        orm_mode = True 