import pymysql
import os
from dotenv import load_dotenv

load_dotenv()

try:
    conn = pymysql.connect(
        host='127.0.0.1',
        user='root',
        password='',
        database='travel_platform'
    )
    with conn.cursor() as cursor:
        print("Listing tables in 'travel_platform':")
        cursor.execute("SHOW TABLES")
        tables = cursor.fetchall()
        for t in tables:
            print(f" - {t[0]}")
            
        print("\nChecking 'users' table content:")
        cursor.execute("SELECT * FROM users")
        users = cursor.fetchall()
        for u in users:
            print(f"User: {u}")
            
    conn.close()
except Exception as e:
    print(f"DB Error: {e}")
