function LandingInfo() {
  return (
    <div className="sticky top-0 left-0 flex flex-col justify-center h-dvh">
      <div className=" w-1/2 mx-auto">
        <h1 className="mt-10 text-4xl text-gray-500">
          Visualization Tool:{" "}
          <span className="text-blue-800">Neural Network!</span>
        </h1>
        <p className="text-lg my-10 text-gray-700">
          Experience the power of neural networks like never before! Use our
          interactive visualization tool to explore how each layer processes
          data, adjusts weights, and makes predictions—all in real time. See
          what happens behind the scenes and deepen your understanding of AI
          with an intuitive, hands-on experience.
        </p>
        <button className="w-1/2 mx-auto font-bold outline-3 outline-gray-400 p-4 text-gray-400 hover:cursor-pointer hover:text-black hover:bg-gray-200 transition-colors ease-in-out">
          GET STARTED
        </button>
      </div>
    </div>
  );
}

export default LandingInfo;
