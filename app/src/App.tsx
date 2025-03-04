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

  function startTraining() {
    console.log("Emitting trainNN event...");
    socket.emit("trainNN");
  }

  return (
    <>
      <div className="h-screen flex flex-col justify-center dark:bg-gray-900 dark:text-white">
        <h1 className="text-white text-4xl text-center">NN Visualizer</h1>
        <button
          className="mx-auto my-5 w-2/5 rounded-md outline-2 hover:outline-blue-500 cursor-pointer"
          onClick={startTraining}
        >
          Start Training
        </button>
        <div className="w-1/2 mx-auto outline-2 outline-blue-900">
          <NeuralNetworkGraph layers={[10,4, 4,10]}/>
        </div>
      </div>
    </>
  );
}

export default App;
