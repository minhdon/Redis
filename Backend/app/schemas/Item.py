from pydantic import BaseModel
class Item(BaseModel):
    category: str
    title: str
    price: str
    image: str
    description: str
