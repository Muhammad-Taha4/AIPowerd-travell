import requests
import pymysql
import os
from dotenv import load_dotenv

load_dotenv()

# 1. Test Signup
signup_data = {
    "name": "Test User",
    "email": "test@fusix.com",
    "phone": "+1234567890",
    "password": "Test1234!",
    "role": "traveller"
}

try:
    response = requests.post("http://localhost:5000/api/auth/signup", json=signup_data)
    print(f"Signup Response: {response.status_code}, {response.json()}")
except Exception as e:
    print(f"Signup Request Failed: {e}")

# 2. Verify in MySQL
try:
    # Use default credentials from config.py if not in env
    db_uri = os.environ.get('DATABASE_URL', 'mysql+pymysql://root:@127.0.0.1:3306/travel_platform')
    # Simple parse for root:@127.0.0.1:3306/travel_platform
    conn = pymysql.connect(
        host='127.0.0.1',
        user='root',
        password='',
        database='travel_platform'
    )
    with conn.cursor() as cursor:
        cursor.execute("SELECT * FROM users WHERE email='test@fusix.com'")
        user = cursor.fetchone()
        if user:
            print(f"User found in DB: {user}")
        else:
            print("User NOT found in DB.")
    conn.close()
except Exception as e:
    print(f"DB Verification Failed: {e}")
