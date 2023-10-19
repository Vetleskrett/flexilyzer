from db.session import db
from db.seed import main as seed_database

print("Setting up database...")

# Flush db and recreate with newest version of tables
db.generate_mapping(create_tables=True)

# Fill the db with example data
seed_database()

print("Database setup complete.")
