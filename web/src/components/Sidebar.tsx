import { useLocation, useNavigate } from "react-router-dom";
import { IoCarSportOutline, IoExitOutline, IoTicketOutline } from "react-icons/io5";
import { LuHistory, LuLayoutDashboard, LuSettings, LuWallet } from "react-icons/lu";
import { useEffect, useState } from "react";
import { MdOutlineLocalGasStation } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GiMoneyStack } from "react-icons/gi";

const userSidebarContent = [
  {
    title: "Dashboard",
    icon: LuLayoutDashboard,
    redirect: "/driver/dashboard",
    size: "22",
  },
  {
    title: "Find Charger",
    icon: MdOutlineLocalGasStation,
    redirect: "/driver/find",
    size: "22",
  },
  {
    title: "Bookings",
    icon: IoTicketOutline,
    redirect: "/driver/bookings",
    size: "22",
  },
  {
    title: "History",
    icon: LuHistory,
    redirect: "/driver/history",
    size: "22",
  },
  {
    title: "Car Details",
    icon: IoCarSportOutline,
    redirect: "/driver/car-details",
    size: "22",
  },
  {
    title: "Profile",
    icon: CgProfile,
    redirect: "/driver/profile",
    size: "22",
  },
  {
    title: "Wallet",
    icon: LuWallet,
    redirect: "/driver/wallet",
    size: "22",
  },
  {
    title: "Notifications",
    icon: IoMdNotificationsOutline,
    redirect: "/driver/notifications",
    size: "22",
  },
  {
    title: "Settings",
    icon: LuSettings,
    redirect: "/driver/settings",
    size: "22",
  },
];

const providerSidebarContent = [
  {
    title: "Dashboard",
    icon: LuLayoutDashboard,
    redirect: "/host/dashboard",
    size: "22",
  },
  {
    title: "My Chargers",
    icon: MdOutlineLocalGasStation,
    redirect: "/host/chargers",
    size: "22",
  },
  {
    title: "Reservations",
    icon: IoTicketOutline,
    redirect: "/host/reservations",
    size: "22",
  },
  {
    title: "Earnings",
    icon: GiMoneyStack,
    redirect: "/host/earnings",
    size: "22",
  },
  {
    title: "Profile",
    icon: CgProfile,
    redirect: "/host/profile",
    size: "22",
  },
   {
    title: "Notifications",
    icon: IoMdNotificationsOutline,
    redirect: "/host/notifications",
    size: "22",
  },
  {
    title: "Settings",
    icon: LuSettings,
    redirect: "/host/settings",
    size: "22",
  },
];

const adminSidebarContent = [
  {
    title: "Dashboard",
    icon: LuLayoutDashboard,
    redirect: "/admin/dashboard",
    size: "22",
  },
];

// type SidebarRowWithChildProps = {
//   title: string;
//   icon: any;
//   redirect: string | null;
//   size: string;
//   children: {
//     title: string;
//     redirect: string;
//   }[];
// };

const chooseContent = (role: string) => {
  if (role === "driver") return userSidebarContent;
  if (role === "host") return providerSidebarContent;
  if (role === "admin") return adminSidebarContent;

  return [];
};

const Sidebar = () => {
  const navigate = useNavigate();

  const [currentRoute, setCurrentRoute] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location]);

  return (
    <div className="h-full px-3 py-4 flex flex-col justify-between">
      <div>
        {chooseContent(location.pathname.split("/")[1] || "").map(
          (item, index) => (
            <div
              onClick={() => navigate(item.redirect || "")}
              key={index}
              className="py-4 px-4 cursor-pointer rounded-lg"
              style={{
                backgroundColor: currentRoute.includes(item.redirect || "")
                  ? "#000"
                  : "transparent",
              }}
            >
              <div className="flex items-center space-x-3">
                {item.icon({
                  width: item.size,
                  height: item.size,
                  color: currentRoute.includes(item.redirect || "")
                    ? "#fff"
                    : "#6B7280",
                  className: "text-xl",
                })}
                <p
                  className="text-sm font-medium"
                  style={{
                    color: currentRoute.includes(item.redirect || "")
                      ? "#fff"
                      : "#6B7280",
                  }}
                >
                  {item.title}
                </p>
              </div>
            </div>
          )
        )}
      </div>

      <div className="my-4 px-2">
        <button className="w-full flex items-center space-x-3 bg-[#F8F9FC] rounded-lg border border-[#E3E3E3] px-3 py-2">
          <div className="w-[24px] h-[24px] rounded-full bg-[#FF383C] flex items-center justify-center">
            <IoExitOutline className="text-white text-sm" />
          </div>

          <p className="text-[13px] text-[#1E1E1E] font-medium">Logout</p>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
