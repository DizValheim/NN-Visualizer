import express from "express";
import { createServer } from 'node:http';
import { Server } from "socket.io"
import cors from "cors";

const port = 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

app.use(cors);
app.use(express.json());

io.on("connection", (socket) => {
    console.log("New client connected: ", socket.id);
});

io.on("diconnect", () => {
    console.log("Client disconnected: ", socket.id);
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});