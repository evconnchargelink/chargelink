import {
  IoIosCheckmarkCircleOutline,
  IoIosCloseCircleOutline,
  IoIosInformationCircleOutline,
} from "react-icons/io";
import StationCard from "../../components/StationCard";
import { useEffect, useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { IoCloseCircle } from "react-icons/io5";
import ChargerService from "../../services/admin/charger.service";
import type { ChargerType } from "../../services/host/charger.service";
import ChargerCard from "../../components/StationCard";

const chargerService = new ChargerService();

const getStatsInfo = ({totalBookings}: { totalBookings: number }) => {
  const statsInfo = [
    {
      title: "Total Bookings",
      value: totalBookings.toString() || "0",
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

  return statsInfo;
};

const MapView = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="w-full h-full flex-1 relative">
      <APIProvider apiKey={import.meta.env.VITE_MAPS_API_KEY}>
        <Map
          style={{ width: "100%", height: "100%" }}
          defaultCenter={{ lat: 22.54992, lng: 0 }}
          defaultZoom={3}
          gestureHandling="greedy"
          disableDefaultUI
        />
      </APIProvider>
      {/* what si thw enig of this  */}

      <button
        onClick={onClose}
        className=" cursor-pointer absolute top-2 right-2 z-50 bg-white rounded-full"
      >
        <IoCloseCircle className="text-4xl" />
      </button>
    </div>
  );
};

const AdminStations = () => {
  const [isMapViewOpen, setIsMapViewOpen] = useState(false);

  if (isMapViewOpen) {
    return <MapView onClose={() => setIsMapViewOpen(false)} />;
  }

  const [stations, setStations] = useState<ChargerType[]>([]);

  const fetchStations = async () => {
    try {
      const response = await chargerService.getAll();
      setStations(response.data.chargers);
    } catch (error) {
      console.error("Failed to fetch stations:", error);
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  return (
    <>
      <div className="w-full h-full p-8 overflow-y-scroll">
        {/* heading */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold text-[#1E1E1E]">Stations</h1>
            <p className="text-base text-[#6B7280]">
              Your all stations and details
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMapViewOpen(true)}
              className="flex items-center space-x-3 border-[0.8px] border-black rounded-lg px-3 py-2 bg-black cursor-pointer"
            >
              <p className="text-sm text-white font-medium">Open Map View</p>
            </button>
          </div>
        </div>

        {/* stats */}
        <div className="my-8 grid grid-cols-4 gap-10">
          {getStatsInfo({ totalBookings: stations.length }).map((item, index) => (
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

        {/* stations listing */}
        <div className="w-full my-8 grid grid-cols-3 gap-6">
          {stations.map((station, index) => (
            <ChargerCard key={index} info={station} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminStations;
