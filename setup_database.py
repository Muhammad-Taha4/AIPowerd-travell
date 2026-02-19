import pymysql
import sys
import os

# Add flask_backend to path so 'app' module can be found
sys.path.append(os.path.join(os.getcwd(), 'flask_backend'))

from app import create_app, db
# Import models so SQLAlchemy knows about them
from app.models.user import User, TravellerProfile, AgencyProfile
from app.models.package import TourPackage
from app.models.booking import Booking
from app.models.review import Review
from app.models.chat import ChatMessage

def setup_db():
    try:
        # Create database if not exists
        conn = pymysql.connect(host='127.0.0.1', user='root', password='')
        with conn.cursor() as cursor:
            cursor.execute('CREATE DATABASE IF NOT EXISTS travel_platform')
        conn.commit()
        conn.close()
        print("Database 'travel_platform' verified.")

        # Create tables
        app = create_app()
        with app.app_context():
            db.create_all()
            
            # Verify tables
            from sqlalchemy import inspect
            inspector = inspect(db.engine)
            tables = inspector.get_table_names()
            print(f'Tables in DB: {tables}')
            
        print('Tables created successfully!')
    except Exception as e:
        print(f"Error during DB setup: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    setup_db()
