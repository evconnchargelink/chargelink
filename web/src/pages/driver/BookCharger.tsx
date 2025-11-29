import { MdElectricBolt } from "react-icons/md";
import { IoLocationOutline, IoStar } from "react-icons/io5";
import { useState } from "react";
import { DatePicker } from "../../components/DatePicker";

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

const BookCharger = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
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
      amount: 23000, // Amount in paise (50000 paise = ₹500)
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

  return (
    <div className=" w-full h-full relative">
      <div className="w-full h-[300px] bg-slate-200 absolute top-0 left-0">
        <img
          src="https://i0.wp.com/sunnysidehistory.org/wp-content/uploads/2022/05/2022_05_06_GOOGLEMAPS_SCREENSHOT_SUNNYSIDE.jpg?ssl=1"
          className="w-full h-full object-cover relative z-0 opacity-40"
        />
      </div>

      <div className="w-full flex items-center justify-between px-8 pt-8 relative z-10">
        <h1 className="text-3xl font-bold text-[#1E1E1E] ">Book Charger</h1>

        <button className="order-[0.8px] border-black rounded-lg px-3 py-2 bg-black cursor-pointer">
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
            <p className="text-sm text-slate-600">
              Reserve your charging session
            </p>
          </div>

          <div className="w-full flex flex-1 gap-6">
            {/* start section */}
            <div className="flex-[0.5] space-y-3">
              <p className="text-base text-[#1E1E1E] font-semibold">Start</p>
              <DatePicker
                date={startDate}
                setDate={setStartDate}
                isTimeShown={true}
              />
            </div>

            {/* end section */}
            <div className="flex-[0.5] space-y-3">
              <p className="text-base text-[#1E1E1E] font-semibold">End</p>
              <DatePicker
                date={endDate}
                setDate={setEndDate}
                isTimeShown={true}
              />
            </div>
          </div>

          <div className="w-full flex flex-col space-y-5">
            <p className="text-base text-[#1E1E1E] font-semibold">Vehical</p>

            <select className="border border-gray-300  text-sm rounded-md px-3 py-2 outline-none w-full">
              <option>Type 1</option>
              <option>Type 2</option>
              <option>Type 3</option>
              <option>Type 4</option>
            </select>
          </div>

          <div className="w-full flex flex-col space-y-5">
            <p className="text-base text-[#1E1E1E] font-semibold">
              Special Requests (Optional)
            </p>

            <textarea
              className="border border-gray-300 text-sm rounded-md px-3 py-2 outline-none w-full"
              rows={3}
              placeholder="Any special instructions or requirements..."
            ></textarea>
          </div>

          <div className="w-full flex flex-col space-y-5">
            <button
              onClick={handlePayment}
              className="bg-black text-white px-4 py-3 rounded-lg transition-colors"
            >
              {loading ? "Processing..." : "Proceed to Payment"}
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
                <p className="text-xl font-semibold">Jaipur Place</p>
                <div className="flex items-center space-x-3 border border-slate-300 text-slate-800 px-2 py-1 rounded-lg text-xs">
                  <IoStar className="text-orange-400" />
                  <p>4.3</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-slate-500 text-sm">
                  <IoLocationOutline />
                  <p>Jaipur, Rajasthan</p>
                </div>

                <div className="flex items-center space-x-7 text-sm">
                  <div className="flex items-center space-x-2">
                    <MdElectricBolt />
                    <p className="font-semibold">33 kW</p>
                  </div>

                  <div className="flex items-center bg-amber-100 py-1 px-2 rounded-md text-xs">
                    <p>Type 2</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-200 p-4 bg-white/95 rounded-b-lg">
                <div className="text-xl">
                  <p>
                    <span className="font-bold text-xl">₹230</span>/hr
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCharger;
