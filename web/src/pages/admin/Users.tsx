import {
  IoIosCheckmarkCircleOutline,
  IoIosCloseCircleOutline,
  IoIosInformationCircleOutline,
} from "react-icons/io";
import { LuFilter, LuSearch } from "react-icons/lu";
import Modal from "../../components/Modal";
import { useState } from "react";

const statsInfo = [
  {
    title: "Total Bookings",
    value: "4",
    Icon: IoIosCheckmarkCircleOutline,
    iconBG: "#F3F4F6",
    iconColor: "#1900A9",
  },
  {
    title: "Total Charged",
    value: "100 kWh",
    Icon: IoIosCheckmarkCircleOutline,
    iconBG: "#D1FAE5",
    iconColor: "#10B981",
  },
  {
    title: "Paid",
    value: "100",
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

const AdminUsers = () => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

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
          {statsInfo.map((item, index) => (
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

        <div className="my-14 space-y-14 px-8">
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
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td className="text-green-700">{user.phone}</td>
                    <td>{user.bookings}</td>
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
        </div>
      </div>
    </>
  );
};

export default AdminUsers;
