import { IoIosAdd } from "react-icons/io";
import Modal from "../../components/Modal";
import { useState } from "react";
import StationCard from "../../components/StationCard";

const AddChargerModal = ({
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
        <p className="text-xl font-medium">Add Charger</p>

        <div></div>
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
            <StationCard />
            <StationCard />
            <StationCard />
        </div>
      </div>
    </>
  );
};

export default HostChargers;
