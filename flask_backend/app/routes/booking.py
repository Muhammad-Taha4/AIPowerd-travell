from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.user import User
from ..models.package import TourPackage
from ..models.booking import Booking
from ..services.payment_service import payment_service
from .. import db

booking_bp = Blueprint('booking', __name__)

@booking_bp.route('/create', methods=['POST'])
@jwt_required()
def create_booking():
    user_id = get_jwt_identity()
    data = request.get_json()
    package = TourPackage.query.get_or_404(data.get('package_id'))
    
    booking = Booking(
        traveller_id=user_id,
        package_id=package.id,
        total_price=package.price,
        status='PENDING'
    )
    db.session.add(booking)
    db.session.commit()
    
    checkout_url = payment_service.create_checkout_session(
        package, 
        booking.id,
        success_url=f"http://localhost:3000/booking/success?id={booking.id}",
        cancel_url=f"http://localhost:3000/booking/cancel?id={booking.id}"
    )
    
    return jsonify({"checkout_url": checkout_url, "booking_id": booking.id}), 201

@booking_bp.route('/webhook', methods=['POST'])
def stripe_webhook():
    # ... existing code ...
    return jsonify({"status": "success"}), 200

@booking_bp.route('/my-bookings', methods=['GET'])
@jwt_required()
def get_my_bookings():
    user_id = get_jwt_identity()
    bookings = Booking.query.filter_by(traveller_id=user_id).order_by(Booking.created_at.desc()).all()
    return jsonify([{
        "id": b.id,
        "package": {
            "title": b.package.title,
            "image": b.package.images[0] if b.package.images else "https://images.unsplash.com/photo-1469474968028-56623f02e42e"
        },
        "status": b.status,
        "total_price": float(b.total_price),
        "created_at": b.created_at.isoformat()
    } for b in bookings]), 200
