from datetime import datetime
import uuid
from .. import db

class TourPackage(db.Model):
    __tablename__ = 'tour_packages'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    agency_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    duration_days = db.Column(db.Integer, nullable=False)
    inclusions = db.Column(db.JSON) # { flights: bool, hotels: bool, etc }
    itinerary = db.Column(db.JSON) # [{day: 1, activity: "..."}]
    tags = db.Column(db.JSON) # ["Mountain", "Adventure"]
    images = db.Column(db.JSON) # ["url1", "url2"]
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    agency = db.relationship('User', backref='packages')
