from fastapi import FastAPI
from fastapi.templating import Jinja2Templates
from fastapi.requests import Request
from notes.routers import router

from auth.routers import router_auth
from database.database import Base, engine
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from database.database import async_session
from notes.models.model import Note
from collections_app.models.models import Collection
from typing import AsyncGenerator
from fastapi.middleware.cors import CORSMiddleware
from collections_app.routers import router as router_col
from notifications_app.routers import router as router_not

app = FastAPI()
app.include_router(router, prefix="/notes")
app.include_router(router_auth, prefix="/auth")
app.include_router(router_col, prefix="/collection")
app.include_router(router_not, prefix="/notifications")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True, 
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def on_startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)