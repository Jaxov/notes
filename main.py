from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from fastapi import Request
from fastapi.templating import Jinja2Templates
import itertools

id_counter = itertools.count()

app = FastAPI()

class Note(BaseModel):
    title: str
    content: str
    id: int

class NoteWaiting(BaseModel):
    title: str
    content: str

notes: List[Note] = []

# @app.get("/")
# def read_root():
#     return {"message": "Привет! Это сервис заметок ✍️"}

@app.post("/notes")
def create_note(note_data: NoteWaiting):
    note = Note(title=note_data.title, content=note_data.content, id=next(id_counter))
    notes.append(note)
    return {"message": "Заметка добавлена!", "note": note}

@app.get("/notes")
def get_notes():
    return notes 

@app.delete("/notes/{id}")
def remove_note(id: int):
    try:
        for i, note in enumerate(notes):
            if note.id == id:
                removed_note = notes.pop(i)
                return {"message": "Заметка удалена!", "note": removed_note}
    except IndexError:
        return {"error": "Заметка не найдена"}

@app.put("/notes/{note_id}")
def edit_note(note_id: int, new_note: NoteWaiting):
    try:
        for i, note in enumerate(notes):
            if note.id == note_id:  
                updated_note = Note(title=new_note.title, content=new_note.content, id=note_id)
                notes[i] = updated_note
        return {"message": "Заметка обновлена!", "note": new_note}
    except IndexError:
        return {"error": "Заметка не найдена"}



templates = Jinja2Templates(directory="templates")

@app.get("/")
def read_notes(request: Request):
    return templates.TemplateResponse("index.html", {"request": request, "notes": notes})

