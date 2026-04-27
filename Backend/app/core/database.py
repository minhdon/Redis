from redis.asyncio import Redis

redis_client = Redis(
    host='127.0.0.1', 
    port=6379, 
    db=0, 
    decode_responses=True
)

async def get_redis():
    return redis_client