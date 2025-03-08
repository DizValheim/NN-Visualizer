import LandingInfo from "../components/LandingInfo";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";

function Home() {
  return (
    <div className="h-[250dvh] font-lato flex flex-col justify-center bg-gray-950">
      <Navbar />
      <div className="h-full grid grid-cols-2 justify-center text-left">
        <LandingInfo />
        <Slider />
      </div>
    </div>
  );
}

export default Home;
