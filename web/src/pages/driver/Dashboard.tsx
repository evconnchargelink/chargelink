import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import {
  IoIosAdd,
  IoIosCheckmarkCircleOutline,
  IoIosCloseCircleOutline,
  IoIosInformationCircleOutline,
} from "react-icons/io";
import { useNavigate } from "react-router-dom";
import MapWithRouting from "../../components/Map";

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

const Dashboard = () => {

  const navigate = useNavigate();

  return (
    <div className="w-full h-full p-8 flex-1 flex flex-col">
      {/* heading */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold text-[#1E1E1E]">Dashboard</h1>
          <p className="text-base text-[#6B7280]">Good morning, Ronak!</p>
        </div>

        <div className="flex items-center space-x-3">
          <button onClick={() => navigate("/driver/find")} className="flex items-center space-x-3 border-[0.8px] border-black rounded-lg px-3 py-2 bg-black cursor-pointer">
            <IoIosAdd className="text-white text-lg" />
            <p className="text-sm text-white font-medium">Book Charger</p>
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

      {/* current and past bookings */}
      <div className="w-full flex-1 h-full flex items-center gap-8">
        <div className="flex-[0.4] w-full h-full bg-white shadow-[0px_1px_3px_0px_#0000001A] rounded-xl p-4 space-y-8">

          <div>
            <p className="text-sm text-slate-600">Current Bookings</p>

            <div className="min-h-[100px] flex items-center justify-center">
              <p className="text-xs text-neutral-400">No bookings found</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-slate-600">Past Bookings</p>
             <div className="min-h-[100px] flex items-center justify-center">
              <p className="text-xs text-neutral-400">No bookings found</p>
            </div>
          </div>

        </div>

        <div className="flex-[0.6] w-full h-full rounded-xl">
          {/* <APIProvider apiKey={import.meta.env.VITE_MAPS_API_KEY}> */}
            {/* route between two points */}
            {/* <Map
              style={{ width: "100%", height: "100%" }}
              defaultCenter={{ lat: 22.54992, lng: 72.93993 }}
              defaultZoom={10}
              gestureHandling="greedy"
              disableDefaultUI
              mapId="92b5cb93229cb323b16c57b8"
            />
            <AdvancedMarker position={{ lat: 22.54992, lng: 72.93993 }} />
          </APIProvider> */}

          <MapWithRouting />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
