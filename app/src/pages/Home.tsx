import nn_img from "../assets/Neural_Network.png";
import logo_img from "../assets/Logo.png";

function Home() {
  return (
    <div className="h-screen font-lato flex flex-col justify-center bg-gray-950">
      <nav className="w-full flex fixed top-0 left-0 text-white">
        <div className="ml-20 flex items-center">
          <img
            className="mx-2"
            height={50}
            width={50}
            src={logo_img}
            alt="logo img"
          />{" "}
          <span className="text-xl text-white">NeuraLens.Ai</span>
        </div>
        <div className="my-1 ml-auto mr-20">
          <ul className="flex flex-row my-5 justify-around">
            <li className="mx-5">
              <a href="">Home</a>
            </li>
            <li className="mx-5">
              <a href="">About</a>
            </li>
            <li className="mx-5">
              <a href="">Contact us</a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="grid grid-cols-2 text-left">
        <div className="flex flex-col justify-center">
          <div className="w-1/2 mx-auto my-auto">
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
        <div className="absolute right-1/7 top-1/4 w-1/4 h-1/2 rounded-4xl bg-blue-500/20 blur-[200px]"></div>
        <div className="flex justify-center w-full mx-auto bg-transparent">
          <img
            className="bg-transparent"
            height={500}
            width={500}
            src={nn_img}
            alt="NN image"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
