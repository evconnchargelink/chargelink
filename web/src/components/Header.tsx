import { IoArrowForwardSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import logo from "/logo.png";

const Header = () => {
  return (
    <header className="flex flex-col sticky top-0 z-50 ">
      <div className="w-full flex items-center justify-evenly gap-x-6 px-4 py-4 bg-white/60 backdrop-blur-2xl  border-b border-black/5 ">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-32" />
        </div>

        <div className="flex items-center space-x-16 text-gray-600 font-medium text-base hover:text-primary">
          <Link to={"/"}>Find Charges</Link>
          <Link to={"/"}>Host</Link>
          <Link to={"/"}>Bookings</Link>
        </div>

        <div className="flex items-center space-x-8">
          <button className="px-4 py-2 text-primary font-semibold rounded-xl">
            Log in
          </button>
          <button className="px-4 py-2 text-white bg-primary hover:bg-gray-800 rounded-xl font-semibold text-sm flex items-center space-x-6">
            <p>Sign Up</p>

            <IoArrowForwardSharp />
          </button>
        </div>
      </div>

      <div className="w-full h-[2px]">
        <div className="w-[50%] h-full bg-black"></div>
      </div>
    </header>
  );
};

export default Header;
