import {
  IoIosCheckmarkCircleOutline,
  IoIosCloseCircleOutline,
  IoIosInformationCircleOutline,
} from "react-icons/io";
import { LuFilter, LuSearch } from "react-icons/lu";
import Modal from "../../components/Modal";
import React, { useEffect, useState } from "react";
import UserService from "../../services/admin/user.service";

const userService = new UserService();

const getStatsInfo = ({totalDrivers, totalHosts}:{totalDrivers: number, totalHosts: number}) => {
  const statsInfo = [
    {
      title: "Total Users",
      value: (totalDrivers + totalHosts)?.toString() || "0",
      Icon: IoIosCheckmarkCircleOutline,
      iconBG: "#F3F4F6",
      iconColor: "#1900A9",
    },
    {
      title: "Total Drivers",
      value: totalDrivers?.toString() || "0",
      Icon: IoIosCheckmarkCircleOutline,
      iconBG: "#D1FAE5",
      iconColor: "#10B981",
    },
    {
      title: "Total Hosts",
      value: totalHosts?.toString() || "0",
      Icon: IoIosCloseCircleOutline,
      iconBG: "#FEE2E2",
      iconColor: "#EF4444",
      percentageIncrease: "",
    },
    {
      title: "Stations Visited",
      value: "120",
      Icon: IoIosInformationCircleOutline,
      iconBG: "#F3F4F6",
      iconColor: "#6B7280",
    },
  ];

  return statsInfo;
};

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
    bookings: 4,
  },
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
    bookings: 4,
  },
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
    bookings: 4,
  },
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
    bookings: 4,
  },
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
    bookings: 4,
  },
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
    bookings: 4,
  },
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
    bookings: 4,
  },
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
    bookings: 4,
  },
];

const DriversTab = ({
  setIsUserModalOpen,
  drivers,
}: {
  setIsUserModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  drivers: UserType[];
}) => {
  return (
    <div className="w-full">
      <table className="w-full">
        <thead className="[&>tr>*]:text-start [&>tr>*]:pb-3 border-b border-slate-300">
          <tr className="[&>*]:text-sm [&>*]:text-slate-900 [&>*]:font-normal">
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Total Bookings</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="[&>tr>*]:text-start [&>tr>*]:py-5 [&>tr]:border-b [&>tr]:border-slate-300 [&>tr>*]:text-xs">
          {drivers.map((user, index) => (
            <tr key={index}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td className="text-green-700">{user.number}</td>
              <td>{0}</td>
              <td>
                <button
                  onClick={() => {
                    setIsUserModalOpen(true);
                  }}
                  className="px-3 py-1 border border-black rounded-xl opacity-50 hover:opacity-100 cursor-pointer"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const HostsTab = ({
  setIsUserModalOpen,
  hosts
}: {
  setIsUserModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  hosts: UserType[];
}) => {
  return (
    <div className="w-full">
      <table className="w-full">
        <thead className="[&>tr>*]:text-start [&>tr>*]:pb-3 border-b border-slate-300">
          <tr className="[&>*]:text-sm [&>*]:text-slate-900 [&>*]:font-normal">
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Total Bookings</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="[&>tr>*]:text-start [&>tr>*]:py-5 [&>tr]:border-b [&>tr]:border-slate-300 [&>tr>*]:text-xs">
          {hosts.map((user, index) => (
            <tr key={index}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td className="text-green-700">{user.number}</td>
              <td>{0}</td>
              <td>
                <button
                  onClick={() => {
                    setIsUserModalOpen(true);
                  }}
                  className="px-3 py-1 border border-black rounded-xl opacity-50 hover:opacity-100 cursor-pointer"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const UserModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div
        className="w-[80%] h-[80%] bg-white rounded-2xl p-8"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <p className="text-xl font-medium">User Details</p>
      </div>
    </Modal>
  );
};

type UserType = {
  _id: string;
  name: string;
  email: string;
  number: string;
};

const AdminUsers = () => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [drivers, setDrivers] = useState<UserType[]>([]);
  const [hosts, setHosts] = useState<UserType[]>([]);
  const [currentTab, setCurrentTab] = useState<"drivers" | "hosts">("drivers");

  const fetchUsers = async () => {
    try {
      const response = await userService.getAll();

      setDrivers(response.data.drivers);
      setHosts(response.data.hosts);
    } catch (e) {}
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <UserModal
        open={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
      />
      <div className="w-full h-full overflow-y-scroll">
        {/* heading */}
        <div className="flex items-center justify-between pt-8 px-8">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold text-[#1E1E1E]">Users</h1>
            <p className="text-base text-[#6B7280]">
              Your all users and details
            </p>
          </div>
        </div>

        {/* stats */}
        <div className="my-8 grid grid-cols-4 gap-10 px-8">
          {getStatsInfo({totalDrivers: drivers.length, totalHosts: hosts.length}).map((item, index) => (
            <div
              key={index}
              className="space-x-2 bg-white rounded-xl py-2 px-4 flex justify-between shadow-[0px_1px_3px_0px_#0000001A] "
            >
              <div className="flex flex-col space-y-2">
                <p className="text-xs text-[#6B7280]">{item.title}</p>

                <div className="flex items-start space-x-2">
                  <p className="text-base text-[#1E1E1E] font-bold">
                    {item.value}
                  </p>

                  {item.percentageIncrease && (
                    <p className="text-[10px]">
                      <span className="text-[#10B981] font-medium">
                        {item.percentageIncrease}
                      </span>{" "}
                      <span className="text-[#9CA3AF]">vs last month</span>
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div
                  className={`w-[28px] h-[28px] rounded-lg flex items-center justify-center`}
                  style={{
                    backgroundColor: item.iconBG,
                  }}
                >
                  <item.Icon />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="my-6 space-y-14 px-8">
          <div className=" flex items-center justify-between sticky top-0 bg-[#F8F9FC] py-5">
            <div className="flex items-center space-x-5">
              <div className="flex items-center space-x-2 border w-[400px] border-slate-400 px-4 py-2 rounded-lg">
                <LuSearch />
                <input
                  type="text"
                  placeholder="Search"
                  className="outline-none w-full text-sm"
                />
              </div>

              <div className="flex items-center space-x-2  text-black border border-slate-400 text-sm px-4 py-2 rounded-lg">
                <LuFilter />
                <p>Filter</p>
              </div>
            </div>
          </div>
        </div>

          <div className="my-4 w-full px-8">
            <div className="py-6 sticky top-0 z-10 bg-[#F8F9FC]">
              <div className="flex items-center space-x-5 border-b border-b-slate-200 ">
                <div
                  onClick={() => {
                    setCurrentTab("drivers");
                  }}
                  className={`pb-1 px-5 border-b  cursor-pointer ${
                    currentTab === "drivers"
                      ? "border-b-black"
                      : "border-b-transparent text-neutral-500"
                  }`}
                >
                  <p className="text-sm">Drivers</p>
                </div>

                <div
                  onClick={() => {
                    setCurrentTab("hosts");
                  }}
                  className={`pb-1 px-5 border-b cursor-pointer ${
                    currentTab === "hosts"
                      ? "border-b-black"
                      : "border-b-transparent text-neutral-500"
                  }`}
                >
                  <p className="text-sm">Hosts</p>
                </div>
              </div>
            </div>

            <div className="pb-16">
              {currentTab === "drivers" ? (
                <DriversTab setIsUserModalOpen={setIsUserModalOpen} drivers={drivers}/>
              ) : (
                <HostsTab setIsUserModalOpen={setIsUserModalOpen} hosts={hosts}/>
              )}
            </div>
          </div>
      </div>
    </>
  );
};

export default AdminUsers;
