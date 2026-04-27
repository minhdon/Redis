from redis.asyncio import Redis
from app.schemas.Item import Item
class ItemCRUD:
    def __init__(self, redis_client: Redis):
        self.redis = redis_client

    async def create_item(self, item_id: str, item: Item):
    # Kiểm tra xem item đã tồn tại chưa để tránh ghi đè nhầm
            exists = await self.redis.exists(f"item:{item_id}")
            if exists:
                raise Exception("Item đã tồn tại!")
            await self.redis.hset(f"item:{item_id}", mapping=item.model_dump())

    async def get_item(self, item_id: str) -> Item:
        item_data = await self.redis.hgetall(f"item:{item_id}")
        if item_data:
            return Item(**item_data)
        return None

    async def update_item(self, item_id: str, item: Item):
        await self.redis.hset(f"item:{item_id}", mapping=item.model_dump())

    async def delete_item(self, item_id: str):
        await self.redis.delete(f"item:{item_id}")
    async def list_items(self):
        keys = await self.redis.keys("item:*")
        items = []
        for key in keys:
            item_data = await self.redis.hgetall(key)
            if item_data:
                items.append(Item(**item_data))
        return items