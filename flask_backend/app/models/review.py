from datetime import datetime
import uuid
from .. import db

class Review(db.Model):
    __tablename__ = 'reviews'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    booking_id = db.Column(db.String(36), db.ForeignKey('bookings.id'), nullable=False)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False) # 1-5
    comment = db.Column(db.Text)
    photos = db.Column(db.JSON) # ["url1", "url2"]
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    booking = db.relationship('Booking', backref=db.backref('review', uselist=False))
    user = db.relationship('User', backref='reviews_given')
