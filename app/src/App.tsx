import { useEffect } from "react";
import io from "socket.io-client";
import NeuralNetworkGraph from "./components/NeuralNetworkGraph";

const socket = io("http://localhost:3000");

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server with ID: ", socket.id);
    });

    socket.on("updateNN", (data) => {
      console.log("Received data: ", data);
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
    <>
      <div className="h-screen flex flex-col justify-center dark:bg-gray-900 dark:text-white">
        <h1 className="text-white text-4xl text-center mb-10 font-mono">NN Visualizer</h1>
        
        <NeuralNetworkGraph layers={[2, 4, 1]}/>
      </div>
    </>
  );
}

export default App;
