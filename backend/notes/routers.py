from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from database.database import async_session
from notes.models.model import Note, NoteCreate, NoteRead
from notes.crud import get_session, get_user, get_notes_by_user, create_note_with_owner, delete_note_with_owner, update_note_with_owner
from auth.models.models import User
from auth.dependencies import get_current_user
from typing import AsyncGenerator
from fastapi.templating import Jinja2Templates
from fastapi.requests import Request

# from main import templates
# eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwiZXhwIjoxNzUxNDY3MjQ1fQ.KDgzgytsr3t-I_IO-mBfMOMD4f0LKIJBwaJYE8AJYSo
templates = Jinja2Templates(directory="templates")
router = APIRouter()

@router.get("/", response_model=list[NoteRead]) 
async def read_notes_current_user(request: Request,current_user: User = Depends(get_current_user), session: AsyncSession = Depends(get_session)):
    notes_list = await get_notes_by_user(current_user.id, session)
    # return templates.TemplateResponse("index.html", {"request": request, "notes": notes_list})
    return notes_list

@router.post("/", response_model=NoteRead)
async def create_note(note: NoteCreate, user: User = Depends(get_current_user), session: AsyncSession = Depends(get_session)): 
    new_note = await create_note_with_owner(note=note, user_id=user.id, session=session) 
    return new_note

@router.delete("/{note_id}")
async def delete_note(note_id: int,owner: User = Depends(get_current_user), session: AsyncSession = Depends(get_session)):
    delete_note = await delete_note_with_owner(note_id=note_id, owner_id=owner.id, session=session)
    return delete_note

@router.put("/{note_id}", response_model=NoteRead)
async def update_note(note_id: int, new_note: NoteCreate, owner_id: User = Depends(get_current_user), session: AsyncSession = Depends(get_session)):
    updated_note = await update_note_with_owner(note_id=note_id, owner_id=owner_id.id,new_note=new_note,session=session)
    return updated_note
