from auth.dependencies import get_current_user
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import AsyncGenerator
from fastapi import APIRouter, Depends, HTTPException
from database.database import async_session
from collections_app.schemas.schem import CollectionCreate, CollectionUpdate
from collections_app.models.models import Collection

async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session() as session:
        try:
            yield session
            await session.commit()  # commit после работы сессии
        except Exception:
            await session.rollback()    
            raise


async def get_collections_by_user(user_id: int, session: AsyncSession) -> list[Collection]:
    result = await session.execute(select(Collection).where(Collection.owner_id == user_id))
    notes = result.scalars().all()
    return notes


async def create_collection_with_owner(collection: CollectionCreate, user_id: int, session: AsyncSession) -> Collection:
    db_collection = Collection(owner_id=user_id, name=collection.name)
    session.add(db_collection)
    await session.commit()  
    await session.refresh(db_collection)
    return db_collection


async def delete_collection_with_owner(collection_id: int, owner_id: int, session: AsyncSession):
    db_collection = await session.execute(select(Collection).filter(Collection.id == collection_id, Collection.owner_id == owner_id))
    collection = db_collection.scalars().first()
    if not collection:
        raise HTTPException(status_code=404, detail="Collection not found")
    await session.delete(collection)
    await session.commit()
    return {"message": "Collection deleted"}

async def update_collection_with_owner(collection_id: int, owner_id: int, new_collection: CollectionUpdate, session: AsyncSession):
    db_collection = await session.execute(select(Collection).filter(Collection.id == collection_id, Collection.owner_id == owner_id))
    updated_collection = db_collection.scalars().first()
    if not updated_collection:
        raise HTTPException(status_code=404, detail="Note not found")
    updated_collection.name = new_collection.name
    await session.commit()
    await session.refresh(updated_collection)
    return updated_collection

# async def create_note_with_owner(note: NoteCreate, user_id: int, session: AsyncSession) -> Note:
#     db_note = Note(owner_id=user_id, title=note.title, content=note.content)
#     session.add(db_note)
#     await session.commit()  
#     await session.refresh(db_note)
#     return db_note