# class NotificationCreate()
from pydantic import BaseModel
from typing import Optional, Dict
from datetime import datetime
from enum import Enum

class NotificationType(str, Enum):
    comment = "comment"
    share = "share"
    invite = "invite"
    system = "system"

class NotificationStatus(str, Enum):
    unread = "unread"
    read = "read"

class NotificationCreate(BaseModel):
    type: NotificationType
    payload: Dict

class NotificationRead(BaseModel):
    id: int
    user_id: int
    type: NotificationType
    payload: Dict
    status: NotificationStatus
    created_at: datetime
    read_at: Optional[datetime] = None

    class Config:
        from_attributes = True
