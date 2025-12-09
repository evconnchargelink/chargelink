import { MdElectricBolt } from "react-icons/md";
import { IoLocationOutline, IoStar } from "react-icons/io5";
import { useEffect, useState } from "react";
import { DatePickerWithTime } from "../../components/DatePicker";
import { useNavigate, useSearchParams } from "react-router-dom";
import MapWithRouting from "../../components/Map";
import type { CarType } from "../../services/driver/car.service";
import CarService from "../../services/driver/car.service";
import type { ChargerType } from "../../services/host/charger.service";
import ChargerService from "../../services/driver/charger.service";

const carService = new CarService();
const chargerService = new ChargerService();

// Declare Razorpay type for TypeScript
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

const calculateEnergyNeeded = (carPower: number, chargeNeeded: number) => {
  return (carPower * chargeNeeded) / 100;
};

const calculateChargingTime = (
  carEstimatedTimeTaken: number,
  currentChargeLevel: number,
  targetChargeLevel: number
) => {
  const chargeNeeded = targetChargeLevel - currentChargeLevel;

  const hours = (carEstimatedTimeTaken / 100) * chargeNeeded;
  const totalMinutes = hours * 60;
  const hrs = Math.floor(totalMinutes / 60);
  const mins = Math.floor(totalMinutes % 60);

  return `${hrs}h ${mins}m`;
};

const calculateEndTime = (startTime: Date, chargingTime: string) => {
  const parts = chargingTime.split(" "); // Split by space: ["2h", "30m"]

  let hours = 0;
  let minutes = 0;

  parts.forEach((part) => {
    if (part.includes("h")) {
      hours = parseFloat(part.replace("h", ""));
    }
    if (part.includes("m")) {
      minutes = parseFloat(part.replace("m", ""));
    }
  });

  const totalMinutes = hours * 60 + minutes;
  return new Date(startTime.getTime() + totalMinutes * 60000);
};

const BookCharger = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>(new Date());

  const [vehicals, setVehicals] = useState<CarType[]>([]);

  const [searchParams] = useSearchParams();
  const [charger, setCharger] = useState<ChargerType | null>(null);

  const stationid = searchParams.get("stationid");

  const fetchCharger = async () => {
    try {
      const response = await chargerService.getOne(stationid || "");

      if (response && response.data) {
        setCharger(response.data.charger);
      }
    } catch (e) {
      console.error("Error fetching charger:", e);
    }
  };

  useEffect(() => {
    if (stationid) {
      fetchCharger();
    }
  }, [stationid]);

  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);

  const [currentChargeLevel, setCurrentChargeLevel] = useState<number>(15);
  const [targetChargeLevel, setTargetChargeLevel] = useState<number>(100);
  const [selectedVehical, setSelectedVehical] = useState<{
    name: string;
    power: number;
    estimatedTime: number;
  }>({
    name: "Tata Tiago EV",
    power: 24,
    estimatedTime: 2.5,
  });

  const navigate = useNavigate();

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (amount: number) => {
    setLoading(true);

    const res = await loadRazorpayScript();

    if (!res) {
      alert(
        "Razorpay SDK failed to load. Please check your internet connection."
      );
      setLoading(false);
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_TEST_API_KEY, // Replace with your Test Key ID
      amount: amount * 100, // Amount in paise (50000 paise = ₹500)
      currency: "INR",
      name: "Chargelink",
      description: "Charging session payment",
      image: "/logo.png", // Optional logo
      handler: function (response: RazorpayResponse) {
        console.log("Payment ID:", response.razorpay_payment_id);
        console.log("Order ID:", response.razorpay_order_id);
        console.log("Signature:", response.razorpay_signature);

        // Here you can send the response to your backend for verification
        setLoading(false);
        navigate(`/driver/bookings/${response.razorpay_payment_id}/track`);
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9876543210",
      },
      notes: {
        address: "123 Main Street, City, Country",
      },
      theme: {
        color: "#000",
      },
      modal: {
        ondismiss: function () {
          setLoading(false);
          console.log("Payment cancelled by user");
        },
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const fetchCars = async () => {
    try {
      const response = await carService.getAll();
      setVehicals(response.data.cars);
    } catch (e) {
      console.error("Error fetching cars:", e);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className=" w-full h-full relative overflow-y-scroll">
      {isMapOpen && (
        <>
          <button
            onClick={() => setIsMapOpen(false)}
            className="border-[0.8px] border-black rounded-lg px-3 py-2 bg-black cursor-pointer absolute top-4 right-4 z-50"
          >
            <p className="text-xs text-white font-medium">Close Map</p>
          </button>
          <div className="w-full h-full absolute top-0 left-0 z-40">
            <MapWithRouting />
          </div>
        </>
      )}

      <div className="w-full h-[300px] bg-slate-200 absolute top-0 left-0">
        <img
          src="https://i0.wp.com/sunnysidehistory.org/wp-content/uploads/2022/05/2022_05_06_GOOGLEMAPS_SCREENSHOT_SUNNYSIDE.jpg?ssl=1"
          className="w-full h-full object-cover relative z-0 opacity-40"
        />
      </div>

      <div className="w-full flex items-center justify-between px-8 pt-8 relative z-10">
        <h1 className="text-3xl font-bold text-[#1E1E1E] ">Book Charger</h1>

        <button
          onClick={() => setIsMapOpen(true)}
          className="border-[0.8px] border-black rounded-lg px-3 py-2 bg-black cursor-pointer"
        >
          <p className="text-xs text-white font-medium">Open Map</p>
        </button>
      </div>

      <div className="my-8 w-full flex flex-1 gap-6 px-8 relative z-10">
        {/* left section */}
        <div className="flex-[0.6] h-fit bg-white shadow-[0px_1px_3px_0px_#0000001A] rounded-xl p-6 space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-[#1E1E1E]">
              Complete your booking
            </h3>
          </div>

          <div className="w-full flex flex-1 gap-1">
            {/* start section */}
            <div className="flex-1 space-y-3">
              <p className="text-base text-[#1E1E1E] font-semibold">
                Arrival Time*
              </p>
              <DatePickerWithTime date={startDate} setDate={setStartDate} />
            </div>

            {/* end section */}
            {/* <div className="flex-[0.5] space-y-3">
              <p className="text-base text-[#1E1E1E] font-semibold">End</p>
              <DatePickerWithTime date={endDate} setDate={setEndDate} />
            </div> */}
          </div>

          <div className="-mt-6">
            <p className="text-xs text-slate-500">
              Your departure time will be{" "}
              {calculateEndTime(
                startDate,
                calculateChargingTime(
                  selectedVehical.estimatedTime,
                  currentChargeLevel,
                  targetChargeLevel
                )
              ).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
          </div>

          <div className="w-full flex flex-col space-y-5">
            <p className="text-base text-[#1E1E1E] font-semibold">Vehical</p>

            <select
              value={selectedVehical.name}
              onChange={(e) => {
                const selected = vehicals.find(
                  (v) => v.name === e.target.value
                );
                if (selected) {
                  setSelectedVehical(selected);
                }
              }}
              className="border border-gray-300  text-sm rounded-md px-3 py-2 outline-none w-full"
            >
              {vehicals.map((vehical) => (
                <option key={vehical.name} value={vehical.name}>
                  {vehical.name} ({vehical.power} kWh)
                </option>
              ))}
            </select>
          </div>

          <div className="w-full flex flex-col space-y-5">
            <p className="text-base text-[#1E1E1E] font-semibold">
              Current Charge Level
            </p>

            <div className="flex gap-x-3">
              {[15, 25, 50, 75, 100].map((level) => (
                <div
                  key={level}
                  onClick={() => {
                    if (level >= targetChargeLevel) return;

                    setCurrentChargeLevel(level);
                  }}
                  className={`px-4 py-3 w-full  rounded-lg flex items-center justify-center  ${
                    currentChargeLevel == level
                      ? "bg-black text-white"
                      : "bg-gray-300 text-black"
                  } ${
                    level >= targetChargeLevel
                      ? "opacity-30 cursor-not-allowed"
                      : "opacity-100 cursor-pointer"
                  }`}
                >
                  <p className="text-sm font-medium">{level}%</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full flex flex-col space-y-5">
            <p className="text-base text-[#1E1E1E] font-semibold">
              Target Charge Level
            </p>

            <div className="flex gap-x-3">
              {[15, 25, 50, 75, 100].map((level) => (
                <div
                  key={level}
                  onClick={() => {
                    if (level <= currentChargeLevel) return;
                    setTargetChargeLevel(level);
                  }}
                  className={`px-4 py-3 w-full rounded-lg flex items-center justify-center cursor-pointer ${
                    targetChargeLevel == level
                      ? "bg-black text-white"
                      : "bg-gray-300 text-black"
                  } ${
                    level <= currentChargeLevel
                      ? "opacity-30 cursor-not-allowed"
                      : "opacity-100 cursor-pointer"
                  }`}
                >
                  <p className="text-sm font-medium">{level}%</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full flex flex-col space-y-5">
            <p className="text-base text-[#1E1E1E] font-semibold">
              Special Requests (Optional)
            </p>

            <textarea
              className="border border-gray-300 text-sm rounded-md px-3 py-2 outline-none w-full resize-none"
              rows={3}
              placeholder="Any special instructions or requirements..."
            ></textarea>
          </div>

          <div className="w-full flex flex-col space-y-5">
            <button
              onClick={() =>
                handlePayment(
                  parseInt(
                    (
                      calculateEnergyNeeded(
                        selectedVehical.power,
                        targetChargeLevel - currentChargeLevel
                      ) * 16
                    ).toFixed(2)
                  )
                )
              }
              className="bg-black text-white px-4 py-3 font-semibold rounded-lg transition-colors"
            >
              {loading
                ? "Processing..."
                : `Pay ₹${(
                    calculateEnergyNeeded(
                      selectedVehical.power,
                      targetChargeLevel - currentChargeLevel
                    ) * 16
                  ).toFixed(2)}`}
            </button>
          </div>
        </div>

        {/* right section */}
        <div className="flex-[0.4]">
          <div className="w-full  bg-white shadow-[0px_1px_3px_0px_#0000001A] rounded-lg">
            <img
              src="https://www.tripsavvy.com/thmb/1ztDauQqtdmijA8Gr3OfDpogmWs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-688926064-9b7d564a6387451bbe511184b54377a1.jpg"
              className="w-full h-[150px] object-cover object-center rounded-t-lg"
            />

            <div className="p-4 space-y-6">
              <div className="w-full flex items-center justify-between">
                <p className="text-xl font-semibold">
                  {charger?.title || "Unknown Station"}
                </p>
                <div className="flex items-center space-x-3 border border-slate-300 text-slate-800 px-2 py-1 rounded-lg text-xs">
                  <IoStar className="text-orange-400" />
                  <p>{"4.2"}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-slate-500 text-sm">
                  <IoLocationOutline />
                  <p>
                    {charger?.location.name ||
                      "Jaipur, Rajasthan"}
                  </p>
                </div>

                <div className="flex items-center space-x-7 text-sm">
                  <div className="flex items-center space-x-2">
                    <MdElectricBolt />
                    <p className="font-semibold">
                      {charger?.power || "7.4"}
                    </p>
                  </div>

                  {/* <div className="flex items-center bg-amber-100 py-1 px-2 rounded-md text-xs">
                    <p>Type 2</p>
                  </div> */}
                </div>
              </div>

              <div className="flex flex-col border-y border-slate-200 bg-white/95 rounded-b-lg py-4 space-y-4">
                <div className="w-full py-4 bg-gray-200 text-black flex flex-col items-center justify-center rounded-xl space-y-3">
                  <p className="text-3xl font-semibold">
                    {calculateChargingTime(
                      selectedVehical.estimatedTime,
                      currentChargeLevel,
                      targetChargeLevel
                    )}
                  </p>

                  <p className="text-xs text-slate-600">
                    Estimated charging time
                  </p>
                </div>

                <div className="w-full flex items-center justify-between">
                  <p className="text-sm">Arrival Time</p>
                  {/* in 9:12 AM format */}
                  <p className="text-base font-semibold ">
                    {" "}
                    {startDate.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>

                <div className="w-full flex items-center justify-between">
                  <p className="text-sm">Energy Needed</p>

                  <p className="text-base font-semibold">
                    {calculateEnergyNeeded(
                      selectedVehical.power,
                      targetChargeLevel - currentChargeLevel
                    )}{" "}
                    kWh
                  </p>
                </div>

                <div className="w-full flex items-center justify-between">
                  <p className="text-sm">Rate</p>

                  <p className="text-base font-semibold">
                    <span>₹16</span>
                    <span className="text-xs">/unit</span>
                  </p>
                </div>
              </div>

              <div className="w-full flex items-center justify-between">
                <p className="font-medium text-lg">Total</p>

                <p className="text-lg font-semibold">
                  ₹
                  {calculateEnergyNeeded(
                    selectedVehical.power,
                    targetChargeLevel - currentChargeLevel
                  ) >= 10
                    ? (
                        calculateEnergyNeeded(
                          selectedVehical.power,
                          targetChargeLevel - currentChargeLevel
                        ) * 16
                      ).toFixed(2)
                    : 160}
                </p>
              </div>

              {calculateEnergyNeeded(
                selectedVehical.power,
                targetChargeLevel - currentChargeLevel
              ) < 10 && (
                <p className="text-end text-[10px] text-gray-400">
                  Additional charges may apply for energy below 10 kWh
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCharger;
