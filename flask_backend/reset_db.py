from app import create_app, db
from sqlalchemy import text

app = create_app()
with app.app_context():
    print("Disabling foreign key checks...")
    db.session.execute(text("SET FOREIGN_KEY_CHECKS = 0;"))
    
    print("Dropping all tables...")
    # Get all table names
    meta = db.metadata
    for table in reversed(meta.sorted_tables):
        print(f" - Dropping {table.name}")
        db.session.execute(text(f"DROP TABLE IF EXISTS {table.name};"))
    
    # Also drop the migration table if it exists
    db.session.execute(text("DROP TABLE IF EXISTS alembic_version;"))
    
    print("Re-enabling foreign key checks...")
    db.session.execute(text("SET FOREIGN_KEY_CHECKS = 1;"))
    db.session.commit()
    
    print("Creating all tables from models...")
    db.create_all()
    print("Done! Database schema is now synchronized and empty.")
