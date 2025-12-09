import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { FaExpand } from "react-icons/fa";
import { useEffect, useState } from "react";
import { LuFilter, LuSearch } from "react-icons/lu";
import { FaMinimize } from "react-icons/fa6";
import { IoLocationOutline, IoStar } from "react-icons/io5";
import { MdElectricBolt } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import type { ChargerType } from "../../services/host/charger.service";
import ChargerService from "../../services/driver/charger.service";

const chargerService = new ChargerService();

const StationCard = ({ id, info }: { id: string; info: ChargerType }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full hover:shadow-lg hover:scale-95 transition-all duration-300 cursor-pointer rounded-lg">
      <div className="w-full h-[150px] bg-blue-400 rounded-t-lg">
        <img
          src={info.thumbnail}
          className="w-full h-full object-cover object-center rounded-t-lg"
        />
      </div>

      <div className="w-full h-fit bg-white rounded-b-lg pt-4 space-y-5">
        <div className="w-full flex items-center justify-between px-4">
          <p className="text-base font-semibold">{info.title}</p>
          <div className="flex items-center space-x-3 border border-slate-300 text-slate-800 px-2 py-1 rounded-lg text-xs">
            <IoStar className="text-orange-400" />
            <p>{4.3}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-slate-500 text-xs px-4 ">
          <IoLocationOutline />
          <p>{info.location.name}</p>
        </div>

        <div className="flex items-center space-x-7 text-sm px-4">
          <div className="flex items-center space-x-2">
            <MdElectricBolt />
            <p className="font-semibold">{info.power} kW</p>
          </div>
          {/* 
            <div className="flex items-center bg-amber-100 px-4 py-1 rounded-md text-xs">
                <p>Type 2</p>
            </div> */}
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 p-4 bg-white/95 rounded-b-lg">
          <div className="text-sm">
            <p>
              <span className="font-bold text-lg">₹{info.price}</span>/unit
            </p>
          </div>

          <div>
            <button
              onClick={() => navigate(`/driver/find/book?stationid=${id}`)}
              className="bg-black text-white text-xs px-4 py-2 rounded-lg cursor-pointer"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FinderCharger = () => {
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [chargers, setChargers] = useState<ChargerType[]>([]);

  const fetchChargers = async () => {
    try {
      const response = await chargerService.getAll();
      setChargers(response.data.chargers);
    } catch (e) {
      console.error("Failed to fetch chargers", e);
    }
  };

  useEffect(() => {
    fetchChargers();
  }, []);

  return (
    <div className="w-full h-full p-8 flex flex-col flex-1 relative">
      {/* heading */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-[#1E1E1E]">Find Chargers</h1>
        <p className="text-base text-[#6B7280]">
          Find chargers near you or search for a specific charger
        </p>
      </div>

      {/* search bar */}
      <div className="my-8 w-full flex items-center space-x-6">
        <div className="flex items-center space-x-4 border border-slate-400 w-full px-4 py-2 rounded-lg">
          <LuSearch />
          <input
            type="text"
            placeholder="Search chargers"
            className="outline-none w-full text-sm"
          />
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-black text-white text-sm px-4 py-2 rounded-lg">
            <p>Search</p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-100 border border-slate-400 text-black text-sm px-4 py-2 rounded-lg">
            <LuFilter />
            <p>Filter</p>
          </div>
        </div>
      </div>

      {/* map and content */}

      <div className="w-full flex items-center flex-1 gap-6 overflow-hidden">
        <div className="flex-[0.4] w-full h-full flex flex-col space-y-4 overflow-hidden">
          <p className="text-sm text-neutral-600">
            Found <span className="font-bold text-black">21</span> available
            charging stations in Delhi NCR.
          </p>

          <div className="w-full flex-1 h-full bg-slate-100 rounded-lg px-4 py-2 overflow-hidden">
            <div className="w-full h-full flex flex-col space-y-8 overflow-y-scroll no-scrollbar">
              {chargers.map((station, index) => (
                <StationCard id={station._id} key={index} info={station} />
              ))}
            </div>
          </div>
        </div>

        <div
          className={`w-full h-full bg-slate-200 z-30 rounded-xl transition-all duration-300   ${
            isMapExpanded ? "absolute top-0 left-0 flex-1" : "flex-[0.6]"
          }`}
        >
          <div className={`w-full h-full relative`}>
            <div className="absolute top-2 right-2 z-50 flex items-center space-x-5">
              {isMapExpanded && (
                <div
                  onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                  className=" bg-slate-800 text-white px-3 py-2 rounded-lg flex items-center justify-center cursor-pointer shadow-[0px_1px_3px_0px_#0000001A]"
                >
                  <p className="text-[10px]">
                    {" "}
                    {isDrawerOpen ? "Close" : "Open"} Drawer
                  </p>
                </div>
              )}

              <div
                onClick={() => setIsMapExpanded(!isMapExpanded)}
                className=" bg-slate-800 text-white w-[30px] h-[30px] rounded-lg flex items-center justify-center cursor-pointer shadow-[0px_1px_3px_0px_#0000001A]"
              >
                {isMapExpanded ? <FaMinimize /> : <FaExpand />}
              </div>
            </div>

            <APIProvider apiKey={import.meta.env.VITE_MAPS_API_KEY}>
              <Map
                style={{ width: "100%", height: "100%" }}
                defaultCenter={{ lat: 22.54992, lng: 0 }}
                defaultZoom={3}
                gestureHandling="greedy"
                disableDefaultUI
              />
            </APIProvider>

            {isDrawerOpen && (
              <div className="w-full h-fit bg-[#F8F9FC] absolute bottom-0 left-0 z-50 p-4">
                <div className="w-full h-full flex space-x-4 overflow-x-scroll no-scrollbar">
                  {chargers.map((charger, index) => (
                    <div key={index} className="w-[400px] shrink-0">
                      <StationCard id={charger._id} key={index} info={charger} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinderCharger;
