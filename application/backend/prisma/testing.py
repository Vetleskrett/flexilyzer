import asyncio
from prisma import Prisma
from datetime import datetime

from prisma import Json

import json


async def main() -> None:
    try:
        prisma = Prisma()
        await prisma.connect()

        print()
    except Exception as e:
        print("Something went wrong: ", e)
    finally:
        await prisma.disconnect()


if __name__ == "__main__":
    asyncio.run(main())
