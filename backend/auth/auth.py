# from fastapi import APIRouter, HTTPException
# from schemas.schemas import UserLogin, UserRegister
# from auth.users import fake_users_db
# from auth.hash.hash_password import encode_password
# from auth.hash.hash_password import decode_password

# router = APIRouter()
# @router.post("/login")

# async def login(user: UserLogin):
#     db_user = fake_users_db.get(user.username)
#     if not db_user or not decode_password(user.password, db_user["password"]):
#         raise HTTPException(status_code=401, detail="Неверный логин или пароль")

#     return {"token": db_user["token"]}

# @router.post("/register")
# async def register(user: UserRegister):
#     db_user = fake_users_db.get(user.username)
#     if db_user:
#         raise HTTPException(status_code=400, detail="Пользователь уже существует")

#     fake_users_db[user.username] = {
#         "username": user.username,
#         "password": encode_password(user.password),
#         "token": "1234"
#     }

#     return fake_users_db

    