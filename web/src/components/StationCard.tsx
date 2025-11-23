import { IoLocationOutline, IoStar } from "react-icons/io5";
import { MdElectricBolt } from "react-icons/md";

const StationCard = () => {
  return (
    <div className="w-full hover:shadow-lg hover:scale-95 transition-all duration-300 cursor-pointer rounded-lg">
      <div className="w-full h-[150px] bg-blue-400 rounded-t-lg">
        <img
          src="https://www.tripsavvy.com/thmb/1ztDauQqtdmijA8Gr3OfDpogmWs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-688926064-9b7d564a6387451bbe511184b54377a1.jpg"
          className="w-full h-full object-cover object-center rounded-t-lg"
        />
      </div>

      <div className="w-full h-fit bg-white rounded-b-lg pt-4 space-y-5">
        <div className="w-full flex items-center justify-between px-4">
          <p className="text-base font-semibold">Jaipur Place</p>
          <div className="flex items-center space-x-3 border border-slate-300 text-slate-800 px-2 py-1 rounded-lg text-xs">
            <IoStar className="text-orange-400" />
            <p>4.3</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-slate-500 text-xs px-4 ">
            <IoLocationOutline />
            <p>Jaipur, Rajasthan</p>
        </div>

        <div className="flex items-center space-x-7 text-sm px-4">
            <div className="flex items-center space-x-2">
                <MdElectricBolt />
                <p className="font-semibold">33 kW</p>
            </div>

            <div className="flex items-center bg-amber-100 px-4 py-1 rounded-md text-xs">
                <p>Type 2</p>
            </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 p-4 bg-white/95 rounded-b-lg">
                <div className="text-sm">
                    <p><span className="font-bold text-lg">₹230</span>/hr</p>
                </div>

                <div>
                    <button className="bg-black text-white text-xs px-4 py-2 rounded-lg cursor-pointer">Book Now</button>
                </div>
        </div>
      </div>
    </div>
  );
};

export default StationCard;
