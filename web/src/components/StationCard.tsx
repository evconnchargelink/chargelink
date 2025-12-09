import { IoLocationOutline, IoStar } from "react-icons/io5";
import { MdElectricBolt } from "react-icons/md";
import type { ChargerType } from "../services/host/charger.service";

const ChargerCard = ({info}:{info: ChargerType}) => {
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
          <p>{info.location?.name || 'Location not available'}</p>
        </div>

        <div className="flex items-center justify-between px-4 pb-4">
          <div className="flex items-center space-x-7 text-sm ">
            <div className="flex items-center space-x-2">
              <MdElectricBolt />
              <p className="font-semibold">{info.power} kW</p>
            </div>

            <div className="flex items-center bg-amber-100 px-4 py-1 rounded-md text-xs">
              <p>{info.chargerType}</p>
            </div>
          </div>

          <div className="text-sm">
            <p>
              <span className="font-bold text-lg">₹{info.price}</span>/unit
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChargerCard;
