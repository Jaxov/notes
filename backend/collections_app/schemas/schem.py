from pydantic import BaseModel
from datetime import datetime
class Collection(BaseModel):
    id: int
    name: str
    # description: str | None = None
    created_at: datetime
    updated_at: datetime


class CollectionCreate(BaseModel):
    name: str
    
    # description: str | None = None


class CollectionUpdate(BaseModel):
    name: str | None = None
    # description: str | None = None
