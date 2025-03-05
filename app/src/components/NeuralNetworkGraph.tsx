import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

interface NeuralNetworkGraphProps {
  layers: number[]; // Example: [2, 4, 1] for a 2-input, 1-output NN
}

function NeuralNetworkGraph(props: NeuralNetworkGraphProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [layers, setLayers] = useState(props.layers);
  const [weights, setWeights] = useState<any>(null);

  const [loss, setLoss] = useState(0);
  const [epoch, setEpoch] = useState(0);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 800,
      height = 300;
    svg.attr("width", width).attr("height", height);

    // console.log("d3 setup complete");

    const layerSpacing = width / (layers.length + 1);
    const neuronRadius = 15;

    const neuronPositions: { x: number; y: number }[][] = [];

    layers.forEach((neurons, layerIndex) => {
      const x = layerSpacing * (layerIndex + 1);
      const ySpacing = height / (neurons + 1);

      neuronPositions[layerIndex] = [];

      for (let i = 0; i < neurons; i++) {
        const y = ySpacing * (i + 1);
        neuronPositions[layerIndex].push({ x, y });
      }
    });

    //Draw Connections
    for (let layer = 0; layer < layers.length - 1; layer++) {
      neuronPositions[layer].forEach((sourceNeuron, i) => {
        neuronPositions[layer + 1].forEach((targetNeuron, j) => {
          svg
            .append("line")
            .attr("x1", sourceNeuron.x)
            .attr("y1", sourceNeuron.y)
            .attr("x2", targetNeuron.x)
            .attr("y2", targetNeuron.y)
            .attr("stroke", weights ? getColor(weights[layer][i][j]) : "white")
            .attr("stroke-width", 2)
            .lower();
        });
      });
    }

    //Draw Neurons
    layers.forEach((neurons, layerIndex) => {
      neuronPositions[layerIndex].forEach(({ x, y }) => {
        svg
          .append("circle")
          .attr("cx", x)
          .attr("cy", y)
          .attr("r", neuronRadius)
          .attr("fill", "steelblue")
          .attr("stroke", "black")
          .raise();
      });
    });
  }, [layers, weights]);

  useEffect(() => {
    socket.on("trainStep", (data) => {
      console.log("Received update from backend: ", data);
      setEpoch(data.epoch);
      setWeights(data.weights);
      setLoss(data.loss);
    });

    return () => {
      socket.off("connect");
      socket.off("trainStep");
      socket.off("connect_error");
      if (socket.connected) {
        socket.close();
      }
    };
  }, []);

  function startTraining() {
    console.log("Emitting trainNN event...");
    socket.emit("trainNN");
  }

  function getColor(weight: number) {
    const scale = d3
      .scaleLinear<string>()
      .domain([-1, 1])
      .range(["red", "blue"]);
    return scale(weight);
  }

  return (
    <div className="relative w-1/2 mx-auto outline-2 outline-blue-900">
      <div className="h-1/10 flex justify-between">
        <span>Epoch: {epoch}</span>
        <span className="m-1">Loss: {loss}</span>
        <button
          className="m-1 rounded-md p-1 outline-2 hover:outline-blue-500 cursor-pointer"
          onClick={startTraining}
        >
          Start Training
        </button>
      </div>
      <div className="my-10 ">
        <svg className="transition-all ease-in-out" ref={svgRef}></svg>
      </div>
    </div>
  );
}

export default NeuralNetworkGraph;
