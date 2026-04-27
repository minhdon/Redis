import json
import asyncio
import uuid
from app.core.database import redis_client
from app.crud.ItemCRUD import ItemCRUD
from app.schemas.Item import Item

import os



async def run_migrate():
    crud = ItemCRUD(redis_client)
    try:
       
        current_dir = os.path.dirname(os.path.abspath(__file__)) 
        root_dir = os.path.dirname(os.path.dirname(current_dir)) 
        file_path = os.path.join(root_dir,"app", "data", "items.json")

        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            
        for obj in data:
            item_id = str(uuid.uuid4())[:8] # Tạo chuỗi 8 ký tự ngẫu nhiên
            obj['id'] = item_id
            
            item = Item(**obj)
            await crud.create_item(item_id, item)
            
        print(f"Migrate thành công {len(data)} items với ID tự tạo từ 0 đến {len(data)-1}")
    except Exception as e:
        print(f"Lỗi khi migrate: {e}")
    finally:
        # Sửa lỗi DeprecationWarning: dùng aclose() thay vì close()
        await redis_client.aclose()
if __name__ == "__main__":
    asyncio.run(run_migrate())