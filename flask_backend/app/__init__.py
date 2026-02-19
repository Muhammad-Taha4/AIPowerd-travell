from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_socketio import SocketIO
from flask_cors import CORS
from .config import Config

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
socketio = SocketIO(cors_allowed_origins="*")

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize Extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    socketio.init_app(app)
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})


    # Register Blueprints
    from app.routes.auth import auth_bp
    from app.routes.packages import packages_bp
    from app.routes.booking import booking_bp
    from app.routes.ai_recommendations import ai_bp
    from app.routes.chat import chat_bp
    from app.routes.trip_monitoring import monitoring_bp
    from app.routes.analytics import analytics_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(packages_bp, url_prefix='/api/packages')
    app.register_blueprint(booking_bp, url_prefix='/api/booking')
    app.register_blueprint(ai_bp, url_prefix='/api/ai')
    app.register_blueprint(chat_bp, url_prefix='/api/chat')
    app.register_blueprint(monitoring_bp, url_prefix='/api/monitoring')
    app.register_blueprint(analytics_bp, url_prefix='/api/analytics')

    return app
