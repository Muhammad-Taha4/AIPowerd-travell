import os
import sys

# Ensure the 'app' directory is in the path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import create_app, socketio, db

app = create_app()

# Automatic table creation for the demo
with app.app_context():
    try:
        db.create_all()
        print("Database tables created successfully.")
    except Exception as e:
        print(f"Postgres connection failed: {e}. Falling back to SQLite for demo.")
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///fallback.db'
        db.create_all()
        print("SQLite fallback active.")

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    try:
        socketio.run(app, host='0.0.0.0', port=port, debug=True, allow_unsafe_werkzeug=True)
    except OSError:
        socketio.run(app, host='0.0.0.0', port=5001, debug=True, allow_unsafe_werkzeug=True)
