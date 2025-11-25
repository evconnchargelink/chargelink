import { LuFilter, LuSearch } from "react-icons/lu";

const history = [
  {
    id: 1,
    date: "2025-01-01",
    time: "10:00 AM",
    status: "Completed",
    amount: "₹100",
    place: "Jaipur",
  },
  {
    id: 1,
    date: "2025-01-01",
    time: "10:00 AM",
    status: "Completed",
    amount: "₹100",
    place: "Jaipur",
  },
  {
    id: 1,
    date: "2025-01-01",
    time: "10:00 AM",
    status: "Completed",
    amount: "₹100",
    place: "Jaipur",
  },
  {
    id: 1,
    date: "2025-01-01",
    time: "10:00 AM",
    status: "Completed",
    amount: "₹100",
    place: "Jaipur",
  },
  {
    id: 1,
    date: "2025-01-01",
    time: "10:00 AM",
    status: "Completed",
    amount: "₹100",
    place: "Jaipur",
  },
  {
    id: 1,
    date: "2025-01-01",
    time: "10:00 AM",
    status: "Completed",
    amount: "₹100",
    place: "Jaipur",
  },
  {
    id: 1,
    date: "2025-01-01",
    time: "10:00 AM",
    status: "Completed",
    amount: "₹100",
    place: "Jaipur",
  },
  {
    id: 1,
    date: "2025-01-01",
    time: "10:00 AM",
    status: "Completed",
    amount: "₹100",
    place: "Jaipur",
  },
  {
    id: 1,
    date: "2025-01-01",
    time: "10:00 AM",
    status: "Completed",
    amount: "₹100",
    place: "Jaipur",
  },
  {
    id: 1,
    date: "2025-01-01",
    time: "10:00 AM",
    status: "Completed",
    amount: "₹100",
    place: "Jaipur",
  },
  {
    id: 1,
    date: "2025-01-01",
    time: "10:00 AM",
    status: "Completed",
    amount: "₹100",
    place: "Jaipur",
  },
  {
    id: 1,
    date: "2025-01-01",
    time: "10:00 AM",
    status: "Completed",
    amount: "₹100",
    place: "Jaipur",
  },
  {
    id: 1,
    date: "2025-01-01",
    time: "10:00 AM",
    status: "Completed",
    amount: "₹100",
    place: "Jaipur",
  },
  {
    id: 1,
    date: "2025-01-01",
    time: "10:00 AM",
    status: "Completed",
    amount: "₹100",
    place: "Jaipur",
  },
  {
    id: 1,
    date: "2025-01-01",
    time: "10:00 AM",
    status: "Completed",
    amount: "₹100",
    place: "Jaipur",
  },
  {
    id: 1,
    date: "2025-01-01",
    time: "10:00 AM",
    status: "Completed",
    amount: "₹100",
    place: "Jaipur",
  },
];

const History = () => {
  return (
    <div className="w-full h-full overflow-y-scroll">
      {/* heading */}
      <div className="flex flex-col space-y-2 px-8 pt-8">
        <h1 className="text-3xl font-bold text-[#1E1E1E]">History</h1>
        <p className="text-base text-[#6B7280]">Your all activity history</p>
      </div>

      <div className="my-4 space-y-14 px-8">
        <div className="w-full flex items-center justify-between sticky top-0 bg-[#F8F9FC] py-5">
          <div className="flex items-center space-x-5 w-full">
            <div className="flex items-center space-x-2 border w-full border-slate-400 px-4 py-2 rounded-lg">
              <LuSearch />
              <input
                type="text"
                placeholder="Search"
                className="outline-none w-full text-sm"
              />
            </div>

            <div className="flex items-center space-x-2  text-black border border-slate-400 text-sm px-4 py-2 rounded-lg">
              <LuFilter />
              <p>Filter</p>
            </div>
          </div>
        </div>

        <div className="w-full">
          <table className="w-full">
            <thead className="[&>tr>*]:text-start [&>tr>*]:pb-3 border-b border-slate-300">
              <tr className="[&>*]:text-sm [&>*]:text-slate-900 [&>*]:font-normal">
                <th>Booking ID</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Place</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="[&>tr>*]:text-start [&>tr>*]:py-5 [&>tr]:border-b [&>tr]:border-slate-300 [&>tr>*]:text-xs">
              {history.map((history, index) => (
                <tr key={index}>
                  <td>{history.id}</td>
                  <td>{history.date}</td>
                  <td>{history.time}</td>
                  <td className="text-green-700">{history.status}</td>
                  <td>{history.amount}</td>
                  <td>{history.place}</td>
                  <td>View</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
