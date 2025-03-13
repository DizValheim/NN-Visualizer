from flask_socketio import emit
from flask import request
import numpy as np
from app import socketio
from app.model import model
import tensorflow as tf

optimizer = tf.keras.optimizers.Adam(learning_rate=0.01)
loss_fn = tf.keras.losses.MeanSquaredError()

@socketio.on('connect')
def handle_connect():
    print(f"Client connected: {request.sid}")

@socketio.on('disconnect')
def handle_disconnect():
    print(f"Client disconnected: {request.sid}")

@socketio.on('trainNN')
def train_model():
    global stop_training
    stop_training = False

    print("Training...")
    x_train = np.array([[0, 0], [0, 1], [1, 0], [1, 1]], dtype=np.float32)
    y_train = np.array([[0], [1], [1], [0]], dtype=np.float32)

    for epoch in range(1, 2001):
        if(stop_training):
            print("Training stopped.")
            return

        with tf.GradientTape() as tape:
            # Forward Propagation
            x_input = tf.convert_to_tensor(x_train, dtype=tf.float32)
            activations = [x_input.numpy().tolist()]
            for layer in model.layers:
                x_input = layer(x_input)
                activations.append(x_input.numpy().tolist())

            # Compute loss
            predictions = x_input
            loss = loss_fn(y_train, predictions)
        
        # Compute gradients
        gradients = tape.gradient(loss, model.trainable_variables)

        # Apply to update weights
        optimizer.apply_gradients(zip(gradients, model.trainable_variables))

        socketio.emit("trainStep", {
            "epoch": epoch,
            "loss": float(loss.numpy()),
            "activations": activations,
            "weights": [w.numpy().tolist() for w in model.trainable_variables],
            "gradients": [g.numpy().tolist() for g in gradients]
        })

        socketio.sleep(0.01)

@socketio.on("resetTraining")
def reset_training():
    global stop_training
    stop_training = True
    print("Stop training requested...")

    # Reset weights
    for layer in model.layers:
        if hasattr(layer, "kernel_initializer"):
            layer.kernel.assign(layer.kernel_initializer(tf.shape(layer.kernel)))
        if hasattr(layer, "bias_initializer"):
            layer.bias.assign(layer.bias_initializer(tf.shape(layer.bias)))

    socketio.emit("trainingReset")
