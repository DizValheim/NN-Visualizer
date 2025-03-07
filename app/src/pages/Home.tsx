import LandingInfo from "../components/LandingInfo";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";

function Home() {
  return (
    <div className="h-[100dvh] font-lato flex flex-col justify-center bg-gray-950">
      <Navbar />
      <div className="grid grid-cols-2 justify-center text-left">
        <LandingInfo />
        <Slider />
        <div className="absolute right-1/7 top-1/4 w-1/4 h-1/2 rounded-4xl bg-blue-500/40 blur-[200px]"></div>
      </div>
    </div>
  );
}

export default Home;
