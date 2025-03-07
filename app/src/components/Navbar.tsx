import logo_img from "../assets/Logo.png";
function Navbar() {
  return (
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
  );
}

export default Navbar
