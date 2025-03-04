import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface NeuralNetworkGraphProps {
    layers: number[]; // Example: [2, 4, 1] for a 2-input, 1-output NN
}

function NeuralNetworkGraph(props: NeuralNetworkGraphProps) {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if(!svgRef.current) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const width = 800, height = 300;
        svg.attr("width", width).attr("height",height);

        console.log("d3 setup complete");

        const layerSpacing = width / (props.layers.length + 1);
        const neuronRadius = 15;

        const neuronPositions: { x: number, y: number} [][] = [];

        props.layers.forEach((neurons, layerIndex) => {
            const x = layerSpacing * (layerIndex + 1);
            const ySpacing = height / (neurons + 1);
            
            neuronPositions[layerIndex] = [];

            
            for (let i = 0; i < neurons; i++) {
                const y = ySpacing * (i + 1);
                neuronPositions[layerIndex].push({x, y});
            }
        });

        //Draw Connections
        for(let layer = 0; layer < props.layers.length - 1; layer++) {
            neuronPositions[layer].forEach((sourceNeuron) => {
                neuronPositions[layer + 1].forEach((targetNeuron) => {
                    svg.append("line")
                        .attr("x1", sourceNeuron.x)
                        .attr("y1", sourceNeuron.y)
                        .attr("x2", targetNeuron.x)
                        .attr("y2", targetNeuron.y)
                        .attr("stroke", "white")
                        .attr("stroke-width", 2)
                });
            });
        }

        //Draw Neurons
        props.layers.forEach((neurons, layerIndex) => {
            neuronPositions[layerIndex].forEach(({ x, y }) => {
              svg.append("circle")
                .attr("cx", x)
                .attr("cy", y)
                .attr("r", neuronRadius)
                .attr("fill", "steelblue")
                .attr("stroke", "black")
                .raise(); // Moves the circle to the top
            });
          });

    }, [props.layers]);

    return <svg ref={svgRef}></svg>
}

export default NeuralNetworkGraph;