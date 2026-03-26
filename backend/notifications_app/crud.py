from database.database import async_session
from sqlalchemy.ext.asyncio import AsyncSession
from typing import AsyncGenerator
from notifications_app.models.model import Notification, NotificationStatus
from notifications_app.schemas.schemas import NotificationCreate
from sqlalchemy import select
from datetime import datetime

async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session() as session:
        try:
            yield session
            await session.commit()  # commit после работы сессии
        except Exception:
            await session.rollback()    
            raise


async def get_notifications_by_user(user_id: int, session: AsyncSession, only_unread: bool = False) -> list[Notification]:
    query = select(Notification).where(Notification.user_id == user_id)
    if only_unread:
        query = query.where(Notification.status == NotificationStatus.unread)

    result = await session.execute(query.order_by(Notification.created_at.desc()))
    return result.scalars().all()

async def create_notification_with_owner(notification: NotificationCreate,user_id: int,session: AsyncSession ) -> Notification:
    notif = Notification(
        user_id=user_id,
        type=notification.type,
        payload=notification.payload,
        status=NotificationStatus.unread
    )
    session.add(notif)
    await session.commit()
    await session.refresh(notif)
    return notif


async def mark_notification_as_read(notif_id: int,user_id: int,session: AsyncSession) -> Notification | None:
    query = select(Notification).where(
        Notification.id == notif_id,
        Notification.user_id == user_id
    )
    result = await session.execute(query)
    notif = result.scalar_one_or_none()
    if not notif:
        return None

    notif.status = NotificationStatus.read
    notif.read_at = datetime.utcnow()

    session.add(notif)
    await session.commit()
    await session.refresh(notif)
    return notif


async def delete_notification(notif_id: int,user_id: int,session: AsyncSession) -> bool:
    query = select(Notification).where(
        Notification.id == notif_id,
        Notification.user_id == user_id
    )
    result = await session.execute(query)
    notif = result.scalar_one_or_none()
    if not notif:
        return False

    await session.delete(notif)
    await session.commit()
    return True