import { IoIosAdd } from "react-icons/io";
import Modal from "../../components/Modal";
import { useRef, useState } from "react";
import { IoLocationOutline, IoStar } from "react-icons/io5";
import { MdElectricBolt } from "react-icons/md";
import { FiUploadCloud } from "react-icons/fi";
import useToast from "../../hooks/toast.hook";
import ChargerService from "../../services/host/charger.service";

const chargerService = new ChargerService();

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
  const [imgFile, setImgFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState<string>("");

  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: 0,
    lng: 0,
  });

  const [type, setType] = useState<string>("");
  const [power, setPower] = useState<number>(0);
  const [amenities, setAmenities] = useState<string[]>(["ahah"]);
  const [price, setPrice] = useState<number>(0);

  const { openToast } = useToast();

  const openFileSelector = () => {
    if (!inputRef) return;

    inputRef.current?.click();

    const file = inputRef.current?.files?.[0];
    if (!file) return;

    setImgFile(file);
  };

  const fetchCurrentLocation = () => {
    if (!navigator.geolocation) {
      openToast("Geolocation is not supported by your browser", "ERROR");
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLocation({
        lat: Number(latitude.toFixed(5)),
        lng: Number(longitude.toFixed(5)),
      });
    });
  };

  const checkFormValidity = () => {
    if (
      !title ||
      !location ||
      !type ||
      !power ||
      !amenities ||
      !price ||
      !imgFile
    ) {
      return false;
    }
    return true;
  };

  const addCharger = async () => {
    if (!checkFormValidity() || !imgFile) {
      openToast("Please fill all the fields", "ERROR");
      return;
    }

    try {
      const response = await chargerService.addCharger({
        title,
        location,
        type,
        power,
        amenities,
        price,
        imgFile,
      });

      if (response.status === 200) {
        openToast("Charger added successfully", "SUCCESS");
        onClose();
      }
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
          <p className="text-xl font-medium">Add Charger</p>

          <button
            onClick={addCharger}
            disabled={!checkFormValidity()}
            className={`bg-black rounded-lg px-3 py-2 cursor-pointer ${checkFormValidity()?"opacity-100":"opacity-40"}`}
          >
            <p className="text-sm text-white font-medium">Add Charger</p>
          </button>
        </div>

        <div className="my-8 w-full flex flex-1 gap-x-6 justify-between">
          {/* left section */}
          <div className="flex-[0.4]">
            <input ref={inputRef} type="file" className="hidden" />
            <div
              onClick={openFileSelector}
              className="w-full h-[200px] border border-dotted rounded-xl flex flex-col items-center justify-center space-y-3 cursor-pointer"
            >
              <FiUploadCloud className="text-4xl text-gray-400" />

              <p className="text-sm text-gray-400">Upload image of the place</p>
            </div>
          </div>

          {/* right section */}
          <div className="flex-[0.55] flex flex-col space-y-8">
            <div className="flex flex-col space-y-2">
              <p className="text-base font-medium">Title*</p>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Enter a title"
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-3">
                <p className="text-base font-medium">Location*</p>
                <p className="text-sm text-gray-500">
                  ( {location.lat}, {location.lng} )
                </p>
              </div>
              <div
                onClick={fetchCurrentLocation}
                className="border border-gray-300 rounded-lg px-4 py-2 cursor-pointer text-sm text-gray-500 bg-gray-100 flex items-center justify-center space-x-2"
              >
                <IoLocationOutline className="text-gray-500" />
                <p>Set current location</p>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <p className="text-base font-medium">Charger Type*</p>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full outline-none text-gray-500"
              >
                <option value="">Select Charger Type</option>
                <option value="Type 1">Type 1</option>
                <option value="Type 2">Type 2</option>
                <option value="CCS">CCS</option>
                <option value="CHAdeMO">CHAdeMO</option>
              </select>
            </div>

            <div className="flex flex-col space-y-2">
              <p className="text-base font-medium">Hourly Rate*</p>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="Enter the hourly rate"
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <p className="text-base font-medium">Power*</p>
              <input
                type="text"
                value={power}
                onChange={(e) => setPower(Number(e.target.value))}
                placeholder="Enter the power in kwh"
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              />
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
