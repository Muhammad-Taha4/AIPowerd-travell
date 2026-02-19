from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..services.ai_service import ai_service
from ..models.package import TourPackage
from ..models.user import User

ai_bp = Blueprint('ai', __name__)

@ai_bp.route('/recommendations/personalized', methods=['POST'])
@jwt_required()
def personalized_recommendations():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    # Get all packages for the AI to rank
    packages = TourPackage.query.all()
    pkg_list = [{
        "id": p.id,
        "title": p.title,
        "tags": p.tags,
        "price": float(p.price)
    } for p in packages]
    
    prefs = user.traveller_profile.preferences if user.role == 'TRAVELLER' else []
    
    recommendations = ai_service.get_recommendations(prefs, pkg_list)
    return jsonify({"recommendations": recommendations}), 200

@ai_bp.route('/recommendations/best-time/<destination>', methods=['GET'])
def best_time(destination):
    analysis = ai_service.analyze_best_time(destination)
    return jsonify({"destination": destination, "analysis": analysis}), 200

@ai_bp.route('/alerts/real-time/<region>', methods=['GET'])
def real_time_alerts(region):
    alerts = ai_service.fetch_real_time_alerts(region)
    return jsonify({"region": region, "alerts": alerts}), 200
