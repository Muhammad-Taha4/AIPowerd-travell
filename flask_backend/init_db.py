from app import create_app, db
import sys

try:
    app = create_app()
    with app.app_context():
        db.create_all()
        print("Tables created successfully!")
except Exception as e:
    print(f"Error creating tables: {e}")
    sys.exit(1)
