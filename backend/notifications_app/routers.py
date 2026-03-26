from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from auth.models.models import User
from auth.dependencies import get_current_user
from notifications_app.schemas.schemas import NotificationCreate, NotificationRead
from notifications_app.crud import (
    create_notification_with_owner,
    get_notifications_by_user,
    mark_notification_as_read,
    delete_notification
)
from notifications_app.crud import get_session

router = APIRouter()


@router.get("/", response_model=list[NotificationRead])
async def read_user_notifications(
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
    only_unread: bool = False,
):
    """
    текущие уведомления
    """
    notifications = await get_notifications_by_user(
        user_id=current_user.id,
        session=session,
        only_unread=only_unread
    )
    return notifications


@router.post("/", response_model=NotificationRead, status_code=status.HTTP_201_CREATED)
async def create_notification(
    notification: NotificationCreate,
    user: User = Depends(get_current_user),   # если нужно, чтобы сам юзер мог создавать себе
    session: AsyncSession = Depends(get_session),
):
    """
    Создать уведомление для текущего юзера (или для других — если расширишь)
    """
    notif = await create_notification_with_owner(
        notification=notification,
        user_id=user.id,
        session=session
    )
    return notif


@router.patch("/{notif_id}/read", response_model=NotificationRead)
async def read_notification(
    notif_id: int,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """
    Отметить уведомление как прочитанное
    """
    notif = await mark_notification_as_read(
        notif_id=notif_id,
        user_id=current_user.id,
        session=session
    )
    if not notif:
        raise HTTPException(status_code=404, detail="Notification not found")
    return notif


@router.delete("/{notif_id}")
async def delete_user_notification(
    notif_id: int,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    success = await delete_notification(notif_id=notif_id, user_id=current_user.id, session=session)
    if not success:
        raise HTTPException(status_code=404, detail="Notification not found")
    return {"detail": "Notification deleted"}
