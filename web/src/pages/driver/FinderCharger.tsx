import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { FaExpand } from "react-icons/fa";
import { useState } from "react";
import { LuFilter, LuSearch } from "react-icons/lu";
import StationCard from "../../components/StationCard";

const FinderCharger = () => {
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
              <StationCard />
              <StationCard />
              <StationCard />
              <StationCard />
              <StationCard />
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
                  <p className="text-[10px]">Open Drawer</p>
                </div>
              )}

              <div
                onClick={() => setIsMapExpanded(!isMapExpanded)}
                className=" bg-slate-800 text-white w-[30px] h-[30px] rounded-lg flex items-center justify-center cursor-pointer shadow-[0px_1px_3px_0px_#0000001A]"
              >
                <FaExpand />
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

            {
                isDrawerOpen && (
                    <div className="w-full h-fit bg-[#F8F9FC] absolute bottom-0 left-0 z-50 p-4">
                        <div className="w-full h-full flex space-x-4 overflow-x-scroll no-scrollbar">
                           {
                            [1,2,3,4,5].map((item) => (
                                <div key={item} className="w-[400px] shrink-0">
                                    <StationCard />
                                </div>
                            ))
                           }
                        </div>
                    </div>
                )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinderCharger;
