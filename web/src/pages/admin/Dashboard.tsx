import { BarChart, LineChart, PieChart } from "@mui/x-charts";
import {
  IoIosCheckmarkCircleOutline,
  IoIosCloseCircleOutline,
  IoIosInformationCircleOutline,
} from "react-icons/io";
import StatsService from "../../services/admin/stats.service";
import { useEffect, useState } from "react";


const statsService = new StatsService();

const getStatsInfo = ({ totalDrivers, totalHosts }: {totalDrivers: number, totalHosts: number }) => {
  const statsInfo = [
  {
    title: "Total Users",
    value: (totalDrivers + totalHosts).toString() || "0",
    Icon: IoIosCheckmarkCircleOutline,
    iconBG: "#F3F4F6",
    iconColor: "#1900A9",
  },
  {
    title: "Total Drivers",
    value: totalDrivers.toString() || "0",
    Icon: IoIosCheckmarkCircleOutline,
    iconBG: "#D1FAE5",
    iconColor: "#10B981",
  },
  {
    title: "Total Hosts",
    value: totalHosts.toString() || "0",
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
}

const margin = { right: 24 };
const uData = [
  4000, 3000, 2000, 2780, 1890, 2390, 3490, 3200, 3500, 3800, 4200, 4100,
];
const pData = [
  2400, 1398, 9800, 3908, 4800, 3800, 4300, 4100, 4500, 4700, 5200, 5100,
];
const bData = [
  1200, 800, 500, 1200, 900, 1100, 1400, 1300, 1500, 1600, 1800, 1700,
];
const xLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const AdminDashboard = () => {


  const [dashboardStats, setDashboardStats] = useState<{
    driversCount: number;
    hostsCount: number;
  }>({ driversCount: 0, hostsCount: 0 });


  const fetchDashboardStats = async () => {
    try {
      const response = await statsService.getDashboardStats();
      setDashboardStats({
        driversCount: response.data.driversCount || 0,
        hostsCount: response.data.hostsCount || 0,
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return (
    <div className="w-full h-full flex flex-col p-8">
      {/* heading */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-[#1E1E1E]">Dashboard</h1>
        <p className="text-base text-[#6B7280]">Good morning, Admin!</p>
      </div>

      {/* stats */}
      <div className="my-8 grid grid-cols-4 gap-10">
        {getStatsInfo({
          totalDrivers: dashboardStats.driversCount,
          totalHosts: dashboardStats.hostsCount,
        }).map((item, index) => (
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

      {/*  */}
      <div className="w-full flex-1 h-full flex items-center gap-8 overflow-y-hidden">
        <div className="flex-[0.4] w-full h-full bg-white shadow-[0px_1px_3px_0px_#0000001A] rounded-xl p-4 space-y-8 flex flex-col">
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

        <div className="flex-[0.6] w-full h-full bg-white shadow-[0px_1px_3px_0px_#0000001A] rounded-xl p-4 space-y-8">
          <LineChart
            series={[
              { data: pData, label: "Earning" },
              { data: uData, label: "Users" },
              { data: bData, label: "Bookings" },
            ]}
            xAxis={[{ scaleType: "point", data: xLabels }]}
            yAxis={[{ width: 50 }]}
            margin={margin}
            height={400}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
