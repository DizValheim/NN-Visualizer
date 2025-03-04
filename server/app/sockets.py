from flask_socketio import emit
from flask import request
import numpy as np
from app import socketio
from app.model import model

@socketio.on('connect')
def handle_connect():
    print(f"Client connected: {request.sid}")

@socketio.on('disconnect')
def handle_disconnect():
    print(f"Client disconnected: {request.sid}")

@socketio.on('trainNN')
def train_model():
    print("Training...")
    x_train = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
    y_train = np.array([[0], [1], [1], [0]])
    
    for epoch in range(1, 101):
        history = model.fit(x_train, y_train, epochs=1, verbose=0)
        weights = [w.tolist() for w in model.get_weights()]
        emit('updateNN', {'epoch': epoch, 'weights': weights})
