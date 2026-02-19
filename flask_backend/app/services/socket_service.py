from flask_socketio import emit, join_room, leave_room
from .. import socketio
import json

class SocketService:
    @staticmethod
    def handle_connect():
        print("Client connected")

    @staticmethod
    def handle_disconnect():
        print("Client disconnected")

    @staticmethod
    def join_trip_room(data):
        room = data.get('booking_id')
        join_room(room)
        print(f"User joined room: {room}")

    @staticmethod
    def send_location_update(data):
        room = data.get('booking_id')
        emit('location_update', {
            "lat": data.get('lat'),
            "lng": data.get('lng'),
            "timestamp": data.get('timestamp')
        }, to=room)

    @staticmethod
    def handle_sos(data):
        room = data.get('booking_id')
        emit('emergency_alert', {
            "type": "SOS",
            "user_id": data.get('user_id'),
            "location": data.get('location'),
            "message": "EMERGENCY: User triggered SOS!"
        }, to=room, broadcast=True)

socket_service = SocketService()

# Register Event Handlers
@socketio.on('connect')
def on_connect():
    socket_service.handle_connect()

@socketio.on('join_room')
def on_join(data):
    socket_service.join_trip_room(data)

@socketio.on('update_location')
def on_location(data):
    socket_service.send_location_update(data)

@socketio.on('trigger_sos')
def on_sos(data):
    socket_service.handle_sos(data)
