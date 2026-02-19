import requests
import pymysql
import os
from dotenv import load_dotenv

load_dotenv()

# 1. Test Signup with Original Test Email
signup_data = {
    "name": "Test User",
    "email": "test@fusix.com",
    "phone": "+1234567890",
    "password": "Test1234!",
    "role": "traveller"
}

print(f"Attempting signup for {signup_data['email']}...")
try:
    response = requests.post("http://localhost:5000/api/auth/signup", json=signup_data)
    print(f"Signup Response: {response.status_code}, {response.json()}")
except Exception as e:
    print(f"Signup Request Failed: {e}")

# 2. Verify in MySQL
try:
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
            print(f"User found in MySQL DB: {user}")
        else:
            print("User NOT found in MySQL DB.")
    conn.close()
except Exception as e:
    print(f"MySQL Verification Failed: {e}")
