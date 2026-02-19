from datetime import datetime
import uuid
from flask_sqlalchemy import SQLAlchemy
from argon2 import PasswordHasher
from .. import db

ph = PasswordHasher()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=True) # Null for OAuth users
    role = db.Column(db.String(20), nullable=False) # 'TRAVELLER' or 'AGENCY'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    traveller_profile = db.relationship('TravellerProfile', backref='user', uselist=False)
    agency_profile = db.relationship('AgencyProfile', backref='user', uselist=False)

    def set_password(self, password):
        self.password_hash = ph.hash(password)

    def check_password(self, password):
        try:
            return ph.verify(self.password_hash, password)
        except:
            return False

class TravellerProfile(db.Model):
    __tablename__ = 'traveller_profiles'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    full_name = db.Column(db.String(100))
    preferences = db.Column(db.JSON) # List of strings: ["Beach", "Adventure"]
    emergency_contact = db.Column(db.String(20))

class AgencyProfile(db.Model):
    __tablename__ = 'agency_profiles'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    company_name = db.Column(db.String(100))
    description = db.Column(db.Text)
    verified = db.Column(db.Boolean, default=False)
    rating = db.Column(db.Float, default=0.0)
