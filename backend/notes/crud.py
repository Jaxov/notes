from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from database.database import async_session
from notes.models.model import Note, NoteCreate, NoteRead
from auth.schemas.schemas import UserRegister, UserLogin
from auth.models.models import User
from auth.hash.hash import encode_password, verify_password
from typing import AsyncGenerator
from fastapi import APIRouter, Depends, HTTPException


async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session() as session:
        try:
            yield session
            await session.commit()  # commit после работы сессии
        except Exception:
            await session.rollback()
            raise



async def get_user(username: str, session: AsyncSession) -> User | None:
    result = await session.execute(select(User).where(User.username == username))
    return result.scalar_one_or_none()

async def get_notes_by_user(user_id: int, session: AsyncSession) -> list[Note]:
    result = await session.execute(select(Note).where(Note.owner_id == user_id))
    notes = result.scalars().all()
    return notes


async def create_note_with_owner(note: NoteCreate, user_id: int, session: AsyncSession) -> Note:
    db_note = Note(owner_id=user_id, title=note.title, content=note.content)
    session.add(db_note)
    await session.commit()  
    await session.refresh(db_note)
    return db_note


async def delete_note_with_owner(note_id: int, owner_id: int, session: AsyncSession):
    db_note = await session.execute(select(Note).filter(Note.id == note_id, Note.owner_id == owner_id))
    note = db_note.scalars().first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    await session.delete(note)
    await session.commit()
    return {"message": "Note deleted"}

async def update_note_with_owner(note_id: int, owner_id: int, new_note: NoteCreate, session: AsyncSession):
    db_note = await session.execute(select(Note).filter(Note.id == note_id, Note.owner_id == owner_id))
    updated_note = db_note.scalars().first()
    if not updated_note:
        raise HTTPException(status_code=404, detail="Note not found")
    updated_note.title = new_note.title
    updated_note.content = new_note.content
    await session.commit()
    await session.refresh(updated_note)
    return updated_note