from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.package import TourPackage # Assuming Booking model exists later
from .. import db

monitoring_bp = Blueprint('monitoring', __name__)

@monitoring_bp.route('/status/<booking_id>', methods=['GET'])
@jwt_required()
def get_trip_status(booking_id):
    # Mocking status for now as Booking model is in next step
    return jsonify({
        "booking_id": booking_id,
        "status": "ACTIVE",
        "current_location": {"lat": 46.8182, "lng": 8.2275},
        "next_stop": "Interlaken",
        "eta": "45 mins"
    }), 200

@monitoring_bp.route('/sos', methods=['POST'])
@jwt_required()
def trigger_sos():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    # Logic to log SOS in DB and notify authorities/agencies
    print(f"SOS Triggered by {user_id} at {data.get('location')}")
    
    return jsonify({
        "msg": "SOS Alert Sent. Local authorities and your agency have been notified.",
        "status": "EMERGENCY_MODE_ACTIVE"
    }), 201

@monitoring_bp.route('/poi/nearby', methods=['GET'])
def get_nearby_poi():
    lat = request.args.get('lat', type=float)
    lng = request.args.get('lng', type=float)
    
    # Mocking POIs (In real app, call Google Places or Mapbox)
    return jsonify([
        {"name": "Local Clinic", "type": "Medical", "distance": "500m"},
        {"name": "Tourist Police", "type": "Security", "distance": "1.2km"},
        {"name": "Market Square", "type": "Restroom/Dining", "distance": "300m"}
    ]), 200
