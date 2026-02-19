from datetime import datetime
import uuid
from .. import db

class ChatMessage(db.Model):
    __tablename__ = 'chat_messages'
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    sender_id = db.Column(db.String(36), db.ForeignKey('users.id'))
    receiver_id = db.Column(db.String(36), db.ForeignKey('users.id'))
    room_id = db.Column(db.String(100))
    content = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
