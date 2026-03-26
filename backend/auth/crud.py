from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from database.database import async_session
from notes.models.model import Note, NoteCreate, NoteRead
from auth.schemas.schemas import UserRegister, UserLogin
from auth.models.models import User
from auth.hash.hash import encode_password, verify_password
from typing import AsyncGenerator
from sqlalchemy import or_
from fastapi import HTTPException

async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session() as session:
        try:
            yield session
            await session.commit()  # commit после работы сессии
        except Exception:
            await session.rollback()
            raise

async def create_user(userScheme: UserRegister, session: AsyncSession) -> User:

    existing_user = await session.execute(
    select(User).where(
        or_(
            User.email == userScheme.email
        )
        )
    )
    user = existing_user.scalars().first()
    if user:
            raise HTTPException(status_code=400, detail="Пользователь уже зарегистрирован")
    hashed = encode_password(userScheme.password)
    db_user = User(email = userScheme.email, hashed_password = hashed)
    session.add(db_user)
    await session.commit()  
    await session.refresh(db_user)
    return db_user


async def get_user(identifier: str, session: AsyncSession) -> User | None:
    result = await session.execute(
        select(User).where(
            or_(
                User.email == identifier
            )
        )
    )
    return result.scalar_one_or_none()

async def authenticate_user(identifier: str,password: str, session: AsyncSession) -> User | None:
    user = await get_user(identifier, session)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user 


# async def authenticate_user(userScheme: UserLogin, session: AsyncSession) -> User:
