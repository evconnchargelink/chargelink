import { Link, useNavigate } from "react-router-dom";
import loginImage from "../assets/login-img.png";
import logo from "/logo.png";
import { useState } from "react";
import HostAuthService from "../services/host/auth.service";
import DriverAuthService from "../services/driver/auth.service";
import { IoEye, IoEyeOff } from "react-icons/io5";
import useToast from "../hooks/toast.hook";

const hostAuthService = new HostAuthService();
const driverAuthService = new DriverAuthService();

const Signup = () => {
  const [roleType, setRoleType] = useState<string>("driver");
  const [name, setName] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordShowing, setIsPasswordShowing] = useState<boolean>(false);

  const navigate = useNavigate();
  const { openToast } = useToast();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !number || !email || !password) {
      return;
    }

    try {
      if (roleType === "host") {
        await hostAuthService.signup(name, email, password, number);

        navigate("/host/dashboard");
      }

      if (roleType === "driver") {
        await driverAuthService.signup(name, email, password, number);

        navigate("/driver/dashboard");
      }

      openToast("Signup successful!", "SUCCESS");
    } catch (error: any) {
      openToast(error.response?.data?.message || error.message || "Signup failed. Please try again.", "ERROR");
      console.log(error);
    }
  };

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
            <img
              src={logo}
              alt="chargelink logo"
              className="w-[300px] object-contain mb-10"
            />
            <p className="text-3xl font-medium">Sign Up</p>
            <p className="text-sm text-[#6B7280]">Sign up to your account</p>
          </div>

          <div className="w-full bg-slate-50 rounded-lg h-fit grid grid-cols-2 p-3">
            <div
              onClick={() => setRoleType("driver")}
              className={`flex items-center justify-center rounded-lg py-2 cursor-pointer ${
                roleType === "driver"
                  ? "bg-black text-white"
                  : "bg-transparent text-black"
              }`}
            >
              <p>Driver</p>
            </div>

            <div
              onClick={() => setRoleType("host")}
              className={`flex items-center justify-center rounded-lg py-2 cursor-pointer ${
                roleType === "host"
                  ? "bg-black text-white"
                  : "bg-transparent text-black"
              }`}
            >
              <p>Host</p>
            </div>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full h-[45px] rounded-md border-[0.8px] border-slate-500 px-4 py-1 outline-black"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full h-[45px] rounded-md border-[0.8px] border-slate-500 px-4 py-1 outline-black"
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Email"
                className="w-full h-[45px] rounded-md border-[0.8px] border-slate-500 px-4 py-1 outline-black"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex items-center h-[45px] rounded-md border-[0.8px] border-slate-500 px-4 py-1">
              <input
                type={isPasswordShowing ? "text" : "password"}
                placeholder="Password"
                className="w-full outline-none"
                onChange={(e) => setPassword(e.target.value)}
              />

              {isPasswordShowing ? (
                <IoEye
                  className="ml-2 text-xl text-gray-500 cursor-pointer"
                  onClick={() => setIsPasswordShowing(!isPasswordShowing)}
                />
              ) : (
                <IoEyeOff
                  className="ml-2 text-xl text-gray-500 cursor-pointer"
                  onClick={() => setIsPasswordShowing(!isPasswordShowing)}
                />
              )}
            </div>

            <button className="w-full h-[45px] rounded-md bg-black text-white font-medium cursor-pointer">
              Sign up as {roleType}
            </button>
          </form>

          <div className="flex items-center justify-center">
            <p className="text-sm text-[#6B7280]">
              Don't have an account?{" "}
              <Link
                to="/login"
                className="text-black font-medium ml-2 cursor-pointer"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
