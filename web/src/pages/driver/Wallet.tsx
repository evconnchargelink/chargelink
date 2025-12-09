import { useState } from "react";
import CardSection from "../../components/Card";
import { DatePicker } from "../../components/DatePicker";
import { useNavigate } from "react-router-dom";

const transactionHistory = [
  {
    id: 1,
    amount: "₹100",
    date: "2025-01-01",
    paymentStatus: "Success",
  },
  {
    id: 2,
    amount: "₹100",
    date: "2025-01-01",
    paymentStatus: "Failed",
  },
  {
    id: 3,
    amount: "₹100",
    date: "2025-01-01",
    paymentStatus: "In Progress",
  },
  {
    id: 4,
    amount: "₹100",
    date: "2025-01-01",
    paymentStatus: "Success",
  },
  {
    id: 5,
    amount: "₹100",
    date: "2025-01-01",
    paymentStatus: "Success",
  },
  {
    id: 6,
    amount: "₹100",
    date: "2025-01-01",
    paymentStatus: "Success",
  },
  {
    id: 7,
    amount: "₹100",
    date: "2025-01-01",
    paymentStatus: "Success",
  },
];

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

const Wallet = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [addMoneyAmount, setAddMoneyAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
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
      description: "Adding money to wallet",
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
        name: "Ronak Paul",
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
    <div className="w-full h-full p-8 overflow-y-scroll">
      {/* heading */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-[#1E1E1E]">Wallet</h1>
        <p className="text-base text-[#6B7280]">Your wallet balance</p>
      </div>

      {/* wallet balance section */}
      <div className="w-full h-fit flex-1 flex gap-8 my-8">
        <div className="flex-[0.4] w-full h-full bg-white shadow-[0px_1px_3px_0px_#0000001A] rounded-xl p-4 space-y-8">
          <div className="space-y-4 border-b border-b-slate-200 pb-4">
            <p className="text-sm text-[#6B7280]">Wallet Balance</p>
            <p className="text-5xl font-extrabold text-[#1E1E1E]">₹1,000</p>
          </div>

          <div className="space-y-5">
            <p className="text-lg text-[#1E1E1E] font-bold cursor-pointer hover:text-[#059669]">
              Add Money
            </p>

            <div className="flex flex-col space-y-7">
              {" "}
              <input
                type="number"
                value={addMoneyAmount || ""}
                onChange={(e) => setAddMoneyAmount(Number(e.target.value))}
                placeholder="Enter amount (min 500)"
                className="px-6 py-3 bg-gray-200 rounded-lg w-full text-sm placeholder:text-gray-500 outline-none"
              />
              <div className="flex space-x-4">
                {[500, 1000, 2000].map((amount, index) => (
                  <div
                    key={index}
                    onClick={() => setAddMoneyAmount((prev) => prev + amount)}
                    className="text-xs px-4 py-2 border border-slate-300 rounded-full cursor-pointer text-slate-700 hover:text-[#059669]"
                  >
                    + ₹{amount}
                  </div>
                ))}
              </div>
              <button onClick={() => handlePayment(addMoneyAmount)} className="px-6 py-3 bg-black text-white rounded-lg text-sm font-medium w-full">
                Add to Wallet
              </button>
            </div>
          </div>
        </div>

        <div className="flex-[0.6] w-full h-fit  space-y-6">
          <div className="w-full h-[300px]">
            <CardSection
              user={{
                card_name: "Ronak Paul",
                card_number: "1234 5678 9012 3456",
                created_date: new Date(),
              }}
            />
          </div>
        </div>
      </div>

      <div>
        {/* transaction history section */}

        <div className="w-full p-6 bg-white shadow-[0px_1px_3px_0px_#0000001A] rounded-xl">
          <div className="w-full flex items-center justify-between border-b border-slate-200 pb-4">
            <p className="text-lg font-semibold">Transaction History</p>

            <div>
              <DatePicker setDate={setDate} date={date} />
            </div>
          </div>

          <div className="w-full mt-6">
            <table className="w-full">
              <thead className="[&>tr>*]:text-start [&>tr>*]:pb-3 border-b border-slate-300">
                <tr className="[&>*]:text-sm [&>*]:text-slate-900 [&>*]:font-normal">
                  <th>Transaction ID</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Payment Status</th>
                </tr>
              </thead>
              <tbody className="[&>tr>*]:text-start [&>tr>*]:py-5 [&>tr]:border-b [&>tr]:border-slate-300 [&>tr>*]:text-xs">
                {transactionHistory.map((history, index) => (
                  <tr key={index}>
                    <td>{history.id}</td>
                    <td>{history.amount}</td>
                    <td>{history.date}</td>
                    <td>{history.paymentStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
