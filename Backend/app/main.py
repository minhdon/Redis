from fastapi import FastAPI
from app.api.v1 import ItemRouter
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Thay "*" bằng domain frontend của bạn để bảo mật hơn (ví dụ: ["http://localhost:3000"])
    allow_credentials=True,
    allow_methods=["*"],  # Cho phép tất cả các phương thức (GET, POST, PUT, DELETE, OPTIONS,...)
    allow_headers=["*"],  # Cho phép tất cả các headers
)
app.include_router(ItemRouter.router, prefix="/api/v1",tags=["API V1"])
@app.get("/")
async def root():
    return {"message": "Welcome to the FastAPI with Redis example!"}

