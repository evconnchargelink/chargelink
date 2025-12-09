import { IoIosAdd } from "react-icons/io";
import Modal from "../../components/Modal";
import { useEffect, useRef, useState } from "react";
import { IoLocationOutline, IoStar } from "react-icons/io5";
import { FiUploadCloud } from "react-icons/fi";
import useToast from "../../hooks/toast.hook";
import ChargerService, {
  type ChargerType,
} from "../../services/host/charger.service";
import ChargerCard from "../../components/StationCard";

const chargerService = new ChargerService();

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

const AddChargerModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [imgFile, setImgFile] = useState<File | null>(null);

  const [title, setTitle] = useState<string>("");

  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: 0,
    lng: 0,
  });

  const [locationName, setLocationName] = useState<string>("");

  const [type, setType] = useState<string>("");
  const [power, setPower] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  const { openToast } = useToast();

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
    if (!title || !location || !type || !power || !price || !imgFile) {
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
        location: {
          ...location,
          name: locationName,
        },
        type,
        power,
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
            className={`bg-black rounded-lg px-3 py-2 cursor-pointer ${
              checkFormValidity() ? "opacity-100" : "opacity-40"
            }`}
          >
            <p className="text-sm text-white font-medium">Add Charger</p>
          </button>
        </div>

        <div className="my-8 w-full flex flex-1 gap-x-6 justify-between">
          {/* left section */}
          <div className="flex-[0.4]">
            <AddThumbnailComponent imgFile={imgFile} setImgFile={setImgFile} />
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
                <p className="text-base font-medium">Coordinates*</p>
                <p className="text-sm text-gray-500">
                  ({" "}
                  <input
                    onChange={(e) => {
                      setLocation({
                        ...location,
                        lat: parseFloat(e.target.value) || 0,
                      });
                    }}
                    type="number"
                    value={location.lat}
                    className="outline-none w-[40px]"
                    step="0.000001"
                  />
                  ,{" "}
                  <input
                    onChange={(e) => {
                      setLocation({
                        ...location,
                        lng: parseFloat(e.target.value) || 0,
                      });
                    }}
                    type="number"
                    value={location.lng}
                    className="outline-none w-[40px]"
                    step="0.000001"
                  />{" "}
                  )
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
              <div className="flex items-center space-x-3">
                <p className="text-base font-medium">Location*</p>
              </div>
              <input
                type="text"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                placeholder="Enter the name of the location"
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              />
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
              <p className="text-base font-medium">Unit Rate*</p>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="Enter the hourly rate"
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <p className="text-base font-medium">Power (kWh)*</p>
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
  const [chargers, setChargers] = useState<ChargerType[]>([]);

  const fetchChargers = async () => {
    try {
      const response = await chargerService.getAll();
      setChargers(response);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchChargers();
  }, []);

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
          {chargers.map((charger, index) => (
            <ChargerCard key={index} info={charger} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HostChargers;
