import { LineChart, PieChart } from "@mui/x-charts";
import { GoFilter } from "react-icons/go";
import { GrPrint } from "react-icons/gr";
import {
  IoIosCheckmarkCircleOutline,
  IoIosCloseCircleOutline,
  IoIosInformationCircleOutline,
} from "react-icons/io";
import { LuCloudDownload } from "react-icons/lu";

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

const xLabels = ["", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const recentBookings = [
    {
        id: 1,
        date: "2025-01-01",
        time: "10:00 AM",
        status: "Completed",
        amount: "₹100",
        place: "Jaipur",
    },
    {
        id: 1,
        date: "2025-01-01",
        time: "10:00 AM",
        status: "Completed",
        amount: "₹100",
        place: "Jaipur",
    },
    {
        id: 1,
        date: "2025-01-01",
        time: "10:00 AM",
        status: "Completed",
        amount: "₹100",
        place: "Jaipur",
    },
    {
        id: 1,
        date: "2025-01-01",
        time: "10:00 AM",
        status: "Completed",
        amount: "₹100",
        place: "Jaipur",
    },
    {
        id: 1,
        date: "2025-01-01",
        time: "10:00 AM",
        status: "Completed",
        amount: "₹100",
        place: "Jaipur",
    },
    {
        id: 1,
        date: "2025-01-01",
        time: "10:00 AM",
        status: "Completed",
        amount: "₹100",
        place: "Jaipur",
    },
    {
        id: 1,
        date: "2025-01-01",
        time: "10:00 AM",
        status: "Completed",
        amount: "₹100",
        place: "Jaipur",
    }
]

const HostAnalytics = () => {
  return (
    <div className="w-full h-full p-8 overflow-y-scroll">
      {/* heading */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold text-[#1E1E1E]">Analytics</h1>
          <p className="text-base text-[#6B7280]">
            Your earnings, reviews and bookings analytics
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-3 border-[0.8px] border-black rounded-lg px-3 py-2 cursor-pointer">
            <GrPrint className="text-black text-lg" />
            <p className="text-sm text-black font-medium">Print</p>
          </button>

          <button className="flex items-center space-x-3 border-[0.8px] border-black rounded-lg px-3 py-2 bg-black cursor-pointer">
            <LuCloudDownload className="text-white text-lg" />
            <p className="text-sm text-white font-medium">Download</p>
          </button>
        </div>
      </div>

      {/* stats */}
      <div className="my-8 grid grid-cols-4 gap-10">
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

      {/* earning growth and customer review section */}
      <div className="my-8 w-full h-[400px] flex flex-1 gap-6">
        <div className="flex-[0.6] w-full h-full bg-white shadow-[0px_1px_3px_0px_#0000001A] rounded-xl p-6">
          <div className="w-full flex items-center justify-between border-b border-slate-200 pb-4">
            <p className="text-lg font-semibold">Earning Growth</p>

            <div>
              <select className="border-[0.8px] border-slate-300 rounded-lg px-3 py-2 text-xs outline-black">
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Yearly</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <LineChart
              className="-ml-16"
              xAxis={[{ scaleType: "point", data: xLabels }]}
              series={[
                {
                  data: [0, 5.5, 2, 8.5, 1.5, 5, 2, 4],
                  color: "#4fdc24",
                },
              ]}
              height={300}
              width={600}
            />
          </div>
        </div>

        <div className="flex-[0.4] w-full h-full bg-white shadow-[0px_1px_3px_0px_#0000001A] rounded-xl p-6">
          <div className="w-full flex items-center justify-between border-b border-slate-200 pb-4">
            <p className="text-lg font-semibold">Customer Review</p>
          </div>

          <div className="py-4">
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, color: "#f26060" },
                    { id: 1, value: 15, color: "#5a93ee" },
                    { id: 2, value: 20, color: "#4fdc24" },
                  ],
                },
              ]}
              width={200}
              height={200}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-[10px] h-[10px] bg-[#4fdc24] rounded-xs"></div>
                <p className="text-sm font-medium">Positive</p>
              </div>

              <p className="text-sm font-semibold">20%</p>
            </div>

            <div className="w-full flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-[10px] h-[10px] bg-[#f26060] rounded-xs"></div>
                <p className="text-sm font-medium">Negative</p>
              </div>

              <p className="text-sm font-semibold">10%</p>
            </div>

            <div className="w-full flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-[10px] h-[10px] bg-[#5a93ee] rounded-xs"></div>
                <p className="text-sm font-medium">Neutral</p>
              </div>

              <p className="text-sm font-semibold">15%</p>
            </div>
          </div>
        </div>
      </div>

      {/* recent reservations section */}

      <div className="w-full bg-white shadow-[0px_1px_3px_0px_#0000001A] rounded-xl p-6">
        <div className="w-full flex items-center justify-between border-b border-slate-200 pb-4">
          <p className="text-lg font-semibold">Recent Reservations</p>

          <div>
            <button className="flex items-center space-x-3 border-[0.8px] border-black rounded-lg px-3 py-2 cursor-pointer">
              <GoFilter className="text-black text-sm" />
              <p className="text-xs text-black font-medium">Filter</p>
            </button>
          </div>
        </div>

        <div className="my-6 w-full">
          <table className="w-full">
            <thead className="[&>tr>*]:text-start [&>tr>*]:pb-3 border-b border-slate-300">
              <tr className="[&>*]:text-sm [&>*]:text-slate-900 [&>*]:font-normal">
                <th>Booking ID</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Place</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="[&>tr>*]:text-start [&>tr>*]:py-5 [&>tr]:border-b [&>tr]:border-slate-300 [&>tr>*]:text-xs">
              {recentBookings.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.id}</td>
                  <td>{booking.date}</td>
                  <td>{booking.time}</td>
                  <td className="text-green-700">{booking.status}</td>
                  <td>{booking.amount}</td>
                  <td>{booking.place}</td>
                  <td>View</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HostAnalytics;
