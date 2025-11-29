import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { MdElectricBolt } from "react-icons/md";
import Modal from "../../components/Modal";

const AddCarModal = ({
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
        <p className="text-xl font-medium">Add a new car</p>
      </div>
    </Modal>
  );
};

const CarCard = () => {
  return (
    <div className="w-full hover:shadow-lg hover:scale-95 transition-all duration-300 cursor-pointer rounded-lg">
      <div className="w-full h-[150px] bg-blue-400 rounded-t-lg">
        <img
          src="https://namastecar.com/wp-content/uploads/2025/01/Mahindra-Revolutionises-Premium-EV-Segment-with-Pack-Three-Pricing-for-BE-6-and-XEV-9e.jpeg"
          className="w-full h-full object-cover object-top rounded-t-lg"
        />
      </div>

      <div className="w-full h-fit bg-white rounded-b-lg py-4 space-y-5">
        <div className="w-full flex items-center justify-between px-4">
          <p className="text-base font-semibold">Mahindra XEV 9e</p>
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
      </div>
    </div>
  );
};

const CarDetails = () => {
  const [isAddCarModalOpen, setIsAddCarModalOpen] = useState(false);

  return (
    <>
    <AddCarModal
        open={isAddCarModalOpen}
        onClose={() => setIsAddCarModalOpen(false)}
      />
    <div className="w-full h-full p-8 overflow-y-scroll">
      {/* heading */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold text-[#1E1E1E]">My Car Details</h1>
          <p className="text-base text-[#6B7280]">
            Your car details are listed here
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button onClick={() => setIsAddCarModalOpen(true)} className="flex items-center space-x-3 border-[0.8px] border-black rounded-lg px-3 py-2 bg-black cursor-pointer">
            <IoIosAdd className="text-white text-lg" />
            <p className="text-sm text-white font-medium">Add Car</p>
          </button>
        </div>
      </div>

      {/* car list */}
      <div className="my-8 grid grid-cols-3 gap-5">
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
      </div>
    </div>
    </>
  );
};

export default CarDetails;
