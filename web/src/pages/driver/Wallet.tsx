import { useState } from "react";
import CardSection from "../../components/Card";
import { DatePicker } from "../../components/DatePicker";

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

const Wallet = () => {
  const [date, setDate] = useState<Date>(new Date());

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
                placeholder="Enter amount (min 500)"
                className="px-6 py-3 bg-gray-200 rounded-lg w-full text-sm placeholder:text-gray-500 outline-none"
              />
              <div className="flex space-x-4">
                {[500, 1000, 2000].map((amount, index) => (
                  <div
                    key={index}
                    className="text-xs px-4 py-2 border border-slate-300 rounded-full cursor-pointer text-slate-700 hover:text-[#059669]"
                  >
                    + ₹{amount}
                  </div>
                ))}
              </div>
              <button className="px-6 py-3 bg-black text-white rounded-lg text-sm font-medium w-full">
                Add to Wallet
              </button>
            </div>
          </div>
        </div>

        <div className="flex-[0.6] w-full h-fit  space-y-6">
          <div className="w-full h-[300px]">
            <CardSection
              user={{
                card_name: "John Doe",
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
