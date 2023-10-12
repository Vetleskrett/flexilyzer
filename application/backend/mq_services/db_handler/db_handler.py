import asyncio
from prisma import Prisma
# from prisma.models import Course

async def main() -> None:    
    db = Prisma()
    await db.connect()

    

    await db.disconnect()

if __name__ == '__main__':
    asyncio.run(main())