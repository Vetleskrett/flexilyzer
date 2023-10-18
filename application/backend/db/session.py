from pony.orm import Database
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

DATABASE_URL = os.getenv("DATABASE_URL")

db = Database()
db.bind(provider="postgres", dsn=DATABASE_URL)

