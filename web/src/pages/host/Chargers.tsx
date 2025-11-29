import { IoIosAdd } from "react-icons/io";
import Modal from "../../components/Modal";
import { useState } from "react";
import { IoLocationOutline, IoStar } from "react-icons/io5";
import { MdElectricBolt } from "react-icons/md";
import { FiUploadCloud } from "react-icons/fi";
import useToast from "../../hooks/toast.hook";
import { SEVERITY } from "../../store";

const ChargerCard = () => {
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

        <div className="flex items-center justify-between px-4 pb-4">
          <div className="flex items-center space-x-7 text-sm ">
            <div className="flex items-center space-x-2">
              <MdElectricBolt />
              <p className="font-semibold">33 kW</p>
            </div>

            <div className="flex items-center bg-amber-100 px-4 py-1 rounded-md text-xs">
              <p>Type 2</p>
            </div>
          </div>

          <div className="text-sm">
            <p>
              <span className="font-bold text-lg">₹230</span>/hr
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddChargerModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const {openToast} = useToast()

  return (
    <Modal open={open} onClose={onClose}>
      <div
        className="w-[80%] h-[80%] bg-white rounded-2xl p-8"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex items-center justify-between">
          <p className="text-xl font-medium">Add Charger</p>

          <button onClick={() => openToast("Charger added successfully", "SUCCESS")} className="bg-black rounded-lg px-3 py-2 cursor-pointer">
            <p className="text-sm text-white font-medium">Add Charger</p>
          </button>
        </div>

        <div className="my-8 w-full flex flex-1 gap-x-6 justify-between">
          {/* left section */}
          <div className="flex-[0.4]">
            <div className="w-full h-[200px] border border-dotted rounded-xl flex flex-col items-center justify-center space-y-3">
              <FiUploadCloud className="text-4xl text-gray-400" />

              <p className="text-sm text-gray-400">Upload image of the place</p>
            </div>
          </div>

          {/* right section */}
          <div className="flex-[0.55] flex flex-col space-y-8">


            <div className="flex flex-col space-y-2">
              <p className="text-base font-medium">Name*</p>
              <input type="text" placeholder="Enter a name" className="border border-gray-300 rounded-lg px-4 py-2 w-full"/>
            </div>

             <div className="flex flex-col space-y-2">
              <p className="text-base font-medium">Location*</p>
              <input type="text" placeholder="Enter the location" className="border border-gray-300 rounded-lg px-4 py-2 w-full"/>
            </div>

             <div className="flex flex-col space-y-2">
              <p className="text-base font-medium">Charger Type*</p>
              <input type="text" placeholder="Enter the charger type" className="border border-gray-300 rounded-lg px-4 py-2 w-full"/>
            </div>


            <div className="flex flex-col space-y-2">
              <p className="text-base font-medium">Hourly Rate*</p>
              <input type="text" placeholder="Enter the hourly rate" className="border border-gray-300 rounded-lg px-4 py-2 w-full"/>
            </div>



          </div>
        </div>
      </div>
    </Modal>
  );
};

const HostChargers = () => {
  const [isChargerModalOpen, setIsChargerModalOpen] = useState(false);

  return (
    <>
      <AddChargerModal
        open={isChargerModalOpen}
        onClose={() => setIsChargerModalOpen(false)}
      />
      <div className="w-full h-full p-8">
        {/* heading */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold text-[#1E1E1E]">Chargers</h1>
            <p className="text-base text-[#6B7280]">
              Your all chargers and details
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsChargerModalOpen(true)}
              className="flex items-center space-x-3 border-[0.8px] border-black rounded-lg px-3 py-2 bg-black cursor-pointer"
            >
              <IoIosAdd className="text-white text-lg" />
              <p className="text-sm text-white font-medium">Add Charger</p>
            </button>
          </div>
        </div>

        <div className="w-full my-8 grid grid-cols-3 gap-6">
          <ChargerCard />
          <ChargerCard />
          <ChargerCard />
        </div>
      </div>
    </>
  );
};

export default HostChargers;
