from datetime import datetime
import uuid
from .. import db

class Booking(db.Model):
    __tablename__ = 'bookings'
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    traveller_id = db.Column(db.String(36), db.ForeignKey('users.id'))
    package_id = db.Column(db.String(36), db.ForeignKey('tour_packages.id'))
    status = db.Column(db.String(20), default='PENDING') # PENDING, CONFIRMED, CANCELLED
    total_price = db.Column(db.Numeric(10, 2))
    stripe_session_id = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    traveller = db.relationship('User', backref='bookings')
    package = db.relationship('TourPackage', backref='bookings')
