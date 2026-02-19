from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.user import User
from ..models.package import TourPackage
from .. import db

packages_bp = Blueprint('packages', __name__)

@packages_bp.route('', methods=['GET'])
def get_packages():
    # Basic filters
    max_price = request.args.get('max_price', type=float)
    tags = request.args.getlist('tags')
    
    query = TourPackage.query
    if max_price:
        query = query.filter(TourPackage.price <= max_price)
    if tags:
        query = query.filter(TourPackage.tags.contains(tags))
        
    packages = query.all()
    return jsonify([{
        "id": p.id,
        "title": p.title,
        "description": p.description,
        "price": float(p.price),
        "duration": p.duration_days,
        "tags": p.tags,
        "image": p.images[0] if p.images else "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
        "rating": 4.8, # Default for demo
        "agency_id": p.agency_id
    } for p in packages]), 200

@packages_bp.route('', methods=['POST'])
@jwt_required()
def create_package():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if user.role != 'AGENCY':
        return jsonify({"msg": "Only agencies can create packages"}), 403
        
    data = request.get_json()
    package = TourPackage(
        agency_id=user_id,
        title=data.get('title'),
        description=data.get('description'),
        price=data.get('price'),
        duration_days=data.get('duration_days'),
        inclusions=data.get('inclusions'),
        itinerary=data.get('itinerary'),
        tags=data.get('tags'),
        images=data.get('images', [])
    )
    
    db.session.add(package)
    db.session.commit()
    
    return jsonify({"id": package.id, "msg": "Package created successfully"}), 201

@packages_bp.route('/<id>', methods=['GET'])
def get_package(id):
    package = TourPackage.query.get_or_404(id)
    return jsonify({
        "id": package.id,
        "title": package.title,
        "description": package.description,
        "price": float(package.price),
        "inclusions": package.inclusions,
        "itinerary": package.itinerary,
        "tags": package.tags,
        "images": package.images
    }), 200

@packages_bp.route('/compare', methods=['POST'])
def compare_packages():
    ids = request.get_json().get('ids', [])
    packages = TourPackage.query.filter(TourPackage.id.in_(ids)).all()
    return jsonify([{
        "id": p.id,
        "title": p.title,
        "price": float(p.price),
        "inclusions": p.inclusions,
        "duration": p.duration_days
    } for p in packages]), 200
