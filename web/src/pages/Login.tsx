import { Link } from "react-router-dom";
import loginImage from "../assets/login-img.png";
import logo from "/logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import driverApi from "../apis/driver.api";
import { IoEye, IoEyeOff } from "react-icons/io5";
import useToast from "../hooks/toast.hook";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordShowing, setIsPasswordShowing] = useState<boolean>(false);
  const { openToast } = useToast();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    try {
      const response = await driverApi.post("/login", { email, password });

      if (response.data.role === "driver") {
        navigate("/driver/dashboard");
      } else if (response.data.role === "host") {
        navigate("/host/dashboard");
      } else if (response.data.role === "admin") {
        navigate("/admin/dashboard");
      }

      openToast("Login successful", "SUCCESS");
    } catch (error:any) {
      openToast(error.response?.data?.message || error.message || "Error in logging in", "ERROR");
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
            <p className="text-3xl font-medium">Login</p>
            <p className="text-sm text-[#6B7280]">Sign in to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Email"
                className="w-full h-[45px] rounded-md border-[0.8px] border-slate-500 px-4 py-1 outline-black"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex items-center border-[0.8px] border-slate-500 px-4 h-[45px] py-1 rounded-md outline-black">
              <input
                type={isPasswordShowing ? "text" : "password"}
                placeholder="Password"
                className="w-full outline-none "
                value={password}
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
              Login
            </button>
          </form>

          <div className="flex items-center justify-center">
            <p className="text-sm text-[#6B7280]">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-black font-medium ml-2 cursor-pointer"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
