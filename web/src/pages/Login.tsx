import { Link } from "react-router-dom";
import loginImage from "../assets/login-img.png";
import logo from "/logo.png";

const Login = () => {
  return (
    <div className="w-full h-screen flex items-center flex-1">
      <div className="flex-[0.5] w-full h-full bg-[#F8F9FC]">
        <img
          src={loginImage}
          className="w-full h-full object-cover"
          alt="Login side image"
        />
      </div>

      <div className="flex-[0.5] w-full h-full flex items-center justify-center">
        <div className=" w-[70%] flex flex-col space-y-8">
          <div className="flex flex-col items-center justify-center space-y-5">
            <img src={logo} alt="chargelink logo" className="w-[300px] object-contain mb-10"/>
            <p className="text-3xl font-medium">Login</p>
            <p className="text-sm text-[#6B7280]">Sign in to your account</p>
          </div>

          <form action="" className="space-y-4">
            <div>
              <input type="text" placeholder="Email" className="w-full h-[45px] rounded-md border-[0.8px] border-slate-500 px-4 py-1 outline-black" />
            </div>

            <div>
              <input type="password" placeholder="Password" className="w-full h-[45px] rounded-md border-[0.8px] border-slate-500 px-4 py-1 outline-black" />
            </div>

            <button className="w-full h-[45px] rounded-md bg-black text-white font-medium">Login</button>
          </form>

          <div className="flex items-center justify-center">
            <p className="text-sm text-[#6B7280]">Don't have an account? <Link to="/signup" className="text-black font-medium ml-2 cursor-pointer">Sign Up</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
