from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from database.database import async_session
from collections_app.models.models import CollectionRead
from auth.models.models import User
from auth.dependencies import get_current_user
from typing import AsyncGenerator
from fastapi.templating import Jinja2Templates
from fastapi.requests import Request
from collections_app.crud import get_session, create_collection_with_owner, delete_collection_with_owner, update_collection_with_owner, get_collections_by_user
from collections_app.schemas.schem import CollectionCreate, CollectionUpdate
# from main import templates
# eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwiZXhwIjoxNzUxNDY3MjQ1fQ.KDgzgytsr3t-I_IO-mBfMOMD4f0LKIJBwaJYE8AJYSo
templates = Jinja2Templates(directory="templates")
router = APIRouter()

@router.get("/", response_model=list[CollectionRead]) 
async def read_collection_current_user(request: Request,current_user: User = Depends(get_current_user), session: AsyncSession = Depends(get_session)):
    collecitons_list = await get_collections_by_user(current_user.id, session)
    # return templates.TemplateResponse("index.html", {"request": request, "notes": notes_list})
    return collecitons_list

@router.post("/", response_model=CollectionRead)
async def create_collection(collection: CollectionCreate, user: User = Depends(get_current_user), session: AsyncSession = Depends(get_session)): 
    collection_note = await create_collection_with_owner(collection=collection,user_id=user.id,session=session) 
    return collection_note

@router.delete("/{collection_id}")
async def delete_collection(collection_id: int,owner: User = Depends(get_current_user), session: AsyncSession = Depends(get_session)):
    removed_collection = await delete_collection_with_owner(collection_id=collection_id, owner_id=owner.id, session=session)
    return removed_collection

@router.put("/{collection_id}", response_model=CollectionRead)
async def update_note(collection_id: int, new_collction: CollectionUpdate, owner_id: User = Depends(get_current_user), session: AsyncSession = Depends(get_session)):
    updated_collection = await update_collection_with_owner(collection_id=collection_id, owner_id=owner_id.id,new_collection    =new_collction,session=session)
    return updated_collection
