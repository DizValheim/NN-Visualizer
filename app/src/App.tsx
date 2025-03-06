import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import io from "socket.io-client";
import Train from "./pages/Train";
import Home from "./pages/Home";

const socket = io("http://localhost:3000");

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server with ID: ", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      if (socket.connected) {
        socket.close();
      }
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/train" element={<Train />}/>
    </Routes>
  );
}

export default App;
