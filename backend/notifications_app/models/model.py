from sqlalchemy import Column, Integer, String, DateTime, Enum, JSON, func

from database.database import Base
from datetime import datetime
from pydantic import BaseModel
import enum

class NotificationType(str, enum.Enum):
    comment = "comment"
    share = "share"
    invite = "invite"
    system = "system"

class NotificationStatus(str, enum.Enum):
    unread = "unread"
    read = "read"

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False, index=True)
    type = Column(Enum(NotificationType), nullable=False)
    payload = Column(JSON, nullable=False)
    status = Column(Enum(NotificationStatus), default=NotificationStatus.unread, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    read_at = Column(DateTime(timezone=True), nullable=True)
 
