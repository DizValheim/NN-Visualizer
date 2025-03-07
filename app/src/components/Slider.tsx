import nn_img from "../assets/Neural_Network.png";

function Slider() {
  return (
    <div className="flex justify-center w-full mx-auto bg-transparent">
      <img
        className="my-auto bg-transparent"
        height={400}
        width={400}
        src={nn_img}
        alt="NN image"
      />
    </div>
  );
}

export default Slider;
