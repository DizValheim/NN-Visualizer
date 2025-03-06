import NeuralNetworkGraph from "../components/NeuralNetworkGraph";

function Train() {
  return (
    <div className="h-screen flex flex-col justify-center dark:bg-gray-900 dark:text-white">
      <h1 className="text-white text-4xl text-center mb-10 font-mono">
        NN Visualizer
      </h1>

      <NeuralNetworkGraph layers={[2, 4, 1]} />
    </div>
  );
}

export default Train;
