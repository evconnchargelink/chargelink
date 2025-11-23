import { Outlet } from "react-router-dom";
import Header2 from "./components/Header2";
import Sidebar from "./components/Sidebar";
import { GoChevronLeft } from "react-icons/go";

const AuthLayout = () => {
  return (
    <div className="h-screen overflow-hidden">
      <Header2 />

      <div className="flex-1 h-[calc(100vh-56px)] overflow-hidden">
        <div className="flex flex-1 h-full">
          <div className="relative flex-[0.2] w-full h-full">
          <div className="w-full h-full bg-white border-r border-r-slate-200 overflow-y-auto overflow-x-hidden scrollbar-hide">
            <Sidebar />
          </div>

          {/* Chevron button absolutely positioned relative to parent */}
          <div className="absolute top-4 -right-3 bg-white w-[24px] h-[24px] rounded-full flex items-center justify-center cursor-pointer shadow-[0px_1px_3px_0px_#0000001A] border-[0.8px] border-[#E5E7EB] z-50">
            <GoChevronLeft className="text-[#1E1E1E] text-sm" />
          </div>
        </div>

          <div className="flex-[0.8] w-full h-full bg-[#F8F9FC]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
