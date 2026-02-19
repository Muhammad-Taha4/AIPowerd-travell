from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.user import User
from ..models.package import TourPackage
from ..models.booking import Booking
from ..models.review import Review
from .. import db
from sqlalchemy import func

analytics_bp = Blueprint('analytics', __name__)

@analytics_bp.route('/agency', methods=['GET'])
@jwt_required()
def get_agency_analytics():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if user.role != 'AGENCY':
        return jsonify({"msg": "Forbidden"}), 403
        
    # Stats: Total Bookings, Total Revenue, Average Rating
    stats = db.session.query(
        func.count(Booking.id),
        func.sum(Booking.total_price),
        func.avg(Review.rating)
    ).join(TourPackage, Booking.package_id == TourPackage.id)\
     .outerjoin(Review, Booking.id == Review.booking_id)\
     .filter(TourPackage.agency_id == user_id).first()
     
    return jsonify({
        "total_bookings": stats[0] or 0,
        "total_revenue": float(stats[1] or 0.0),
        "average_rating": float(stats[2] or 0.0)
    }), 200

@analytics_bp.route('/reviews', methods=['POST'])
@jwt_required()
def create_review():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    booking = Booking.query.get(data.get('booking_id'))
    if not booking or booking.traveller_id != user_id:
        return jsonify({"msg": "Unauthorized"}), 401
        
    review = Review(
        booking_id=booking.id,
        user_id=user_id,
        rating=data.get('rating'),
        comment=data.get('comment'),
        photos=data.get('photos', [])
    )
    db.session.add(review)
    db.session.commit()
    
    return jsonify({"msg": "Review submitted successfully"}), 201

@analytics_bp.route('/traveller', methods=['GET'])
@jwt_required()
def get_traveller_analytics():
    user_id = get_jwt_identity()
    
    stats = db.session.query(
        func.count(Booking.id),
        func.sum(Booking.total_price),
        func.count(Review.id)
    ).filter(Booking.traveller_id == user_id)\
     .outerjoin(Review, Booking.id == Review.booking_id).first()
     
    return jsonify({
        "total_bookings": stats[0] or 0,
        "total_spent": float(stats[1] or 0.0),
        "total_reviews": stats[2] or 0
    }), 200
