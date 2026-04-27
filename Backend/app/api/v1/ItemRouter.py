from fastapi import APIRouter,Depends
import redis
from app.core.database import get_redis
from app.schemas.Item import Item
from app.crud.ItemCRUD import ItemCRUD
from redis.asyncio import Redis

router = APIRouter()
redis_client = Redis(host='localhost', port=6379, db=0,decode_responses=True)
@router.post("/items/{item_id}")
async def create_item(item_id: str, item: Item):
    item_crud = ItemCRUD(redis_client)
    await item_crud.create_item(item_id, item)
    return {"message": "Item created successfully!"}
@router.get("/items/{item_id}")
async def read_item(item_id: str):
    item_crud = ItemCRUD(redis_client)
    item = await item_crud.get_item(item_id)
    if item:
        return item
    return {"message": "Item not found!"}
@router.put("/items/{item_id}")
async def update_item(item_id: str, item: Item):
    item_crud = ItemCRUD(redis_client)
    await item_crud.update_item(item_id, item)
    return {"message": "Item updated successfully!"}
@router.delete("/items/{item_id}")
async def delete_item(item_id: str):
    item_crud = ItemCRUD(redis_client)
    await item_crud.delete_item(item_id)
    return {"message": "Item deleted successfully!"}
@router.get("/items/")
async def read_all(redis=Depends(get_redis)):
    crud = ItemCRUD(redis)
    items = await crud.list_items()
    # Trả về danh sách list các object cho Frontend
    return items