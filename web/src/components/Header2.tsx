import { IoMdNotificationsOutline } from "react-icons/io";
import logo from "/logo.png";
import { LuSettings } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header2 = () => {
  const navigate = useNavigate();

  const [currentRole, setCurrentRole] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    setCurrentRole(location.pathname.split("/")[1] || "");
  }, [location]);

  return (
    <header className="flex flex-col sticky top-0 z-50 ">
      <div className="w-full flex items-center justify-between gap-x-6 px-10 py-4 bg-white/60 backdrop-blur-2xl  border-b border-black/5 ">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-32" />
        </div>

        <div className="flex items-center space-x-6">
          <IoMdNotificationsOutline
            onClick={() => navigate(`${currentRole}/notifications`)}
            className="text-2xl text-slate-500 cursor-pointer"
          />

          <LuSettings
            onClick={() => navigate(`${currentRole}/settings`)}
            className="text-xl text-slate-500 cursor-pointer"
          />

          <div
            className="flex items-center space-x-4 cursor-pointer"
            onClick={() => navigate(`${currentRole}/profile`)}
          >
            <div className="w-[35px] h-[35px] bg-slate-300 rounded-full">
              <img
                src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
                alt="Profile"
                className="w-full h-full rounded-full object-cover object-top"
              />
            </div>

            <div className="flex flex-col items-start">
              <p className="text-sm font-medium">Ronak Paul</p>
              <p className="text-xs text-slate-400">
                {currentRole.charAt(0).toUpperCase() + currentRole.slice(1)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header2;
