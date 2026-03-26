from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from core.config import ACCESS_TOKEN_EXPIRE_MINUTES
from auth.schemas.schemas import UserRegister, UserLogin, RegisterFormRead, LoginFormRead
from auth.crud import create_user, authenticate_user, get_session
from auth.token import create_access_token, verify_access_token
from datetime import timedelta

router_auth = APIRouter()
security = HTTPBearer()  # для Bearer токена

@router_auth.post("/register", response_model=RegisterFormRead)
async def register_user(user: UserRegister, session: AsyncSession = Depends(get_session)):
    new_user = await create_user(user, session)
    await session.commit()  
    return new_user

@router_auth.post("/login", response_model=LoginFormRead)
async def login_user(user: UserLogin, session: AsyncSession = Depends(get_session)):
    user_obj = await authenticate_user(user.username, user.password, session)
    if not user_obj:
        raise HTTPException(status_code=401, detail="Неверный логин или пароль")

    token = await create_access_token(
        data={"sub": str(user_obj.id)},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )

    return {"access_token": token, "token_type": "bearer"}

@router_auth.get("/auth/verify")
async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        user_id = verify_access_token(token)
        return {"valid": True, "user_id": user_id}
    except HTTPException as e:
        raise e
