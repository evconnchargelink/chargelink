import { useEffect, useRef, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { MdElectricBolt } from "react-icons/md";
import Modal from "../../components/Modal";
import { FiUploadCloud } from "react-icons/fi";
import useToast from "../../hooks/toast.hook";
import CarService, { type CarType } from "../../services/driver/car.service";

const carService = new CarService();

const vehicals = [
  {
    name: "Tesla Model 3",
    power: 60,
    estimatedTime: 3,
  },
  {
    name: "Nissan Leaf",
    power: 40,
    estimatedTime: 2,
  },
  {
    name: "Mahindra XUV300",
    power: 30,
    estimatedTime: 4,
  },
];

const AddThumbnailComponent = ({
  imgFile,
  setImgFile,
}: {
  imgFile: File | null;
  setImgFile: React.Dispatch<React.SetStateAction<File | null>>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const openFileSelector = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("clicked");
    if (file) {
      setImgFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        console.log("Preview URL:", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (preview) {
    return (
      <div className="w-full border border-slate-500 rounded-xl">
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        <img
          onClick={openFileSelector}
          src={preview}
          alt="Preview"
          className="w-full h-[200px] object-cover rounded-xl cursor-pointer"
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      <div
        onClick={openFileSelector}
        className="w-full h-[200px] border border-dotted rounded-xl flex flex-col items-center justify-center space-y-3 cursor-pointer"
      >
        <FiUploadCloud className="text-4xl text-gray-400" />

        <p className="text-sm text-gray-400">Upload image of the place</p>
      </div>
    </div>
  );
};

const AddCarModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [selectedVehical, setSelectedVehical] = useState<string | null>(null);
  const [numberPlate, setNumberPlate] = useState<string>("");

  const { openToast } = useToast();

  const checkFormValidity = () => {
    if (!selectedVehical) {
      return false;
    }
    return true;
  };

  const addCharger = async () => {
    if (!checkFormValidity()) {
      openToast("Please fill all the fields", "ERROR");
      return;
    }

    try {
      const file = new File([], "placeholder.jpg");

      const vehical = vehicals.find((v) => v.name === selectedVehical);
      const response = await carService.addCar(
        vehical?.name!,
        vehical!.power,
        vehical?.estimatedTime!,
        file
      );

      openToast("Car added successfully", "SUCCESS");
      onClose();
    } catch (e: any) {
      openToast(e.message, "ERROR");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div
        className="w-[80%] h-fit bg-white rounded-2xl p-8"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex items-center justify-between">
          <p className="text-xl font-medium">Add a car</p>

          <button
            onClick={addCharger}
            disabled={!checkFormValidity()}
            className={`bg-black rounded-lg px-3 py-2 cursor-pointer ${
              checkFormValidity() ? "opacity-100" : "opacity-40"
            }`}
          >
            <p className="text-sm text-white font-medium">Save</p>
          </button>
        </div>

        <div className="my-8 w-full flex flex-1 gap-x-6 justify-between">
          {/* left section */}
          {/* <div className="flex-[0.4]">
            <AddThumbnailComponent imgFile={imgFile} setImgFile={setImgFile} />
          </div> */}

          {/* right section */}
          <div className="flex-1 flex flex-col space-y-8">
            <div className="flex flex-col space-y-2">
              <p className="text-base font-medium">Cars*</p>

              <div className="w-full space-x-4 flex items-center">
                <select
                  value={selectedVehical || ""}
                  onChange={(e) => {
                    setSelectedVehical(e.target.value);
                  }}
                  className="border border-gray-300  text-sm rounded-md px-3 py-3 outline-none w-full"
                >
                  <option value="">Select a car</option>
                  {vehicals.map((vehical) => (
                    <option key={vehical.name} value={vehical.name}>
                      {vehical.name} ({vehical.power} kWh)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* <div className="flex flex-col space-y-2">
              <p className="text-base font-medium">
                Estimated Time to charge to 100%*
              </p>
              <input
                type="number"
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(Number(e.target.value))}
                placeholder="Enter the time in minutes"
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              />
            </div>

             */}

            <div className="flex flex-col space-y-2">
              <p className="text-base font-medium">Number Plate*</p>
              <input
                type="text"
                value={numberPlate}
                onChange={(e) => setNumberPlate(e.target.value)}
                placeholder="Enter the number plate"
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const CarCard = ({ info }: { info: CarType }) => {
  return (
    <div className="w-full hover:shadow-lg hover:scale-95 transition-all duration-300 cursor-pointer rounded-lg">
      <div className="w-full h-[150px] bg-blue-400 rounded-t-lg">
        <img
          src={info.thumbnail}
          className="w-full h-full object-cover object-top rounded-t-lg"
        />
      </div>

      <div className="w-full h-fit bg-white rounded-b-lg py-4 space-y-5">
        <div className="w-full flex items-center justify-between px-4">
          <p className="text-base font-semibold">{info.name}</p>
        </div>

        <div className="flex items-center space-x-7 text-sm px-4">
          <div className="flex items-center space-x-2">
            <MdElectricBolt />
            <p className="font-semibold">{info.power} kW</p>
          </div>

          {/* <div className="flex items-center bg-amber-100 px-4 py-1 rounded-md text-xs">
            <p>Type 2</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

const CarDetails = () => {
  const [isAddCarModalOpen, setIsAddCarModalOpen] = useState(false);
  const [cars, setCars] = useState<CarType[]>([]);

  const fetchCars = async () => {
    try {
      const response = await carService.getAll();

      setCars(response.data.cars);
    } catch (e) {}
  };

  useEffect(() => {
    fetchCars();
  }, []);

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
            <h1 className="text-3xl font-bold text-[#1E1E1E]">
              My Car Details
            </h1>
            <p className="text-base text-[#6B7280]">
              Your car details are listed here
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsAddCarModalOpen(true)}
              className="flex items-center space-x-3 border-[0.8px] border-black rounded-lg px-3 py-2 bg-black cursor-pointer"
            >
              <IoIosAdd className="text-white text-lg" />
              <p className="text-sm text-white font-medium">Add Car</p>
            </button>
          </div>
        </div>

        {/* car list */}
        <div className="my-8 grid grid-cols-3 gap-5">
          {cars.map((car, index) => (
            <CarCard key={index} info={car} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CarDetails;
