from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.user import User
from ..models.chat import ChatMessage
from .. import db

chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/history/<room_id>', methods=['GET'])
@jwt_required()
def get_chat_history(room_id):
    messages = ChatMessage.query.filter_by(room_id=room_id).order_by(ChatMessage.timestamp.asc()).all()
    return jsonify([{
        "sender_id": m.sender_id,
        "content": m.content,
        "timestamp": m.timestamp.isoformat()
    } for m in messages]), 200

@chat_bp.route('/escalate', methods=['POST'])
@jwt_required()
def escalate_chat():
    data = request.get_json()
    room_id = data.get('room_id')
    # Logic to flag chat for admin/manager intervention
    return jsonify({"msg": "Chat escalated to agency management"}), 200
