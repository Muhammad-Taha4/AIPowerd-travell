from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from ..models.user import User, TravellerProfile, AgencyProfile
from .. import db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    
    if User.query.filter_by(email=data.get('email')).first():
        return jsonify({"msg": "Email already exists"}), 400
        
    user = User(
        email=data.get('email'),
        role=data.get('role', 'TRAVELLER')
    )
    user.set_password(data.get('password'))
    db.session.add(user)
    db.session.flush() # Get user ID
    
    if user.role == 'TRAVELLER':
        profile = TravellerProfile(user_id=user.id, full_name=data.get('name', ''))
    else:
        profile = AgencyProfile(user_id=user.id, company_name=data.get('name', ''))
        
    db.session.add(profile)
    db.session.commit()
    
    access_token = create_access_token(identity=user.id)
    return jsonify({
        "token": access_token,
        "user": {
            "id": user.id,
            "email": user.email,
            "role": user.role,
            "name": data.get('name', '')
        }
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data.get('email')).first()
    
    if user and user.check_password(data.get('password')):
        access_token = create_access_token(identity=user.id)
        return jsonify({
            "token": access_token,
            "user": {
                "id": user.id,
                "email": user.email,
                "role": user.role
            }
        }), 200
        
    return jsonify({"msg": "Bad email or password"}), 401

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_me():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    profile_data = {}
    if user.role == 'TRAVELLER':
        profile_data = {
            "name": user.traveller_profile.full_name,
            "preferences": user.traveller_profile.preferences
        }
    else:
        profile_data = {
            "company_name": user.agency_profile.company_name,
            "verified": user.agency_profile.verified,
            "rating": user.agency_profile.rating
        }
        
    return jsonify({
        "id": user.id,
        "email": user.email,
        "role": user.role,
        "profile": profile_data
    }), 200
