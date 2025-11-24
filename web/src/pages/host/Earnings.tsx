import { BsBank } from "react-icons/bs";
import { CiCreditCard1 } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import { LuCalendar, LuEye } from "react-icons/lu";

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
const Earnings = () => {
  return (
    <div className="w-full h-full p-8 overflow-y-scroll">
      {/* heading */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold text-[#1E1E1E]">Earnings</h1>
          <p className="text-base text-[#6B7280]">
            Your earnings from bookings and chargers are listed here
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-3 border-[0.8px] border-black rounded-lg px-3 py-2 cursor-pointer">
            <IoIosAdd className="text-black text-lg" />
            <p className="text-sm text-black font-medium">Add Account</p>
          </button>
        </div>
      </div>

      {/* balance and withdrawal section */}
      <div className="my-8 w-full p-6 bg-white shadow-[0px_1px_3px_0px_#0000001A] rounded-xl flex items-center justify-between">
        {/* Left section */}
        <div className="flex flex-col space-y-8">
          <div className="flex items-center space-x-7">
            <div className="w-[48px] h-[48px] flex items-center justify-center border border-slate-200 rounded-lg">
              <BsBank />
            </div>

            <div className="flex flex-col space-y-1">
              <div className="flex items-center space-x-3">
                <p className="text-2xl font-semibold">₹22070.00</p>
                <LuEye className="text-xl" />
              </div>

              <p className="text-xs text-green-600">Available for Withdrawal</p>
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-5">
              <p className="text-sm text-neutral-500">Active Accounts:</p>

              <div className="flex items-center space-x-5">
                {[1, 2].map((item) => (
                  <div key={item} className="flex items-center space-x-2">
                    <CiCreditCard1 className="text-lg" />
                    <p className="text-xs text-neutral-500">*******5237262</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-3">
          <button className="border-[0.8px] border-black rounded-lg px-3 py-2 bg-black cursor-pointer">
            <p className="text-sm text-white font-medium">Withdraw</p>
          </button>

          <button className="border-[0.8px] border-black rounded-lg px-3 py-2 cursor-pointer">
            <p className="text-sm text-black font-medium">Show Accounts</p>
          </button>
        </div>
      </div>

      {/* transaction history section */}

      <div className="w-full p-6 bg-white shadow-[0px_1px_3px_0px_#0000001A] rounded-xl">
        <div className="w-full flex items-center justify-between border-b border-slate-200 pb-4">
          <p className="text-lg font-semibold">Transaction History</p>

          <div>
            <button className="flex items-center space-x-3 border-[0.8px] border-black rounded-lg px-3 py-2 cursor-pointer">
              <LuCalendar className="text-black text-sm" />
              <p className="text-xs text-black font-medium">12 Sep - 28 Oct 2025</p>
            </button>
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
  );
};

export default Earnings;
