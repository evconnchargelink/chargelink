import { useEffect, useRef } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import { LuFilter, LuSearch } from "react-icons/lu";

const data = [
  {
    date: "2025-01-01",
    count: 0,
    level: 0,
  },
  {
    date: "2025-02-02",
    count: 16,
    level: 4,
  },
  {
    date: "2025-12-31",
    count: 0,
    level: 0,
  },
];


const bookings = [
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
]

const Bookings = () => {
  const calendarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const calendar = calendarRef.current;
    if (!calendar) return;

    const handleClick = (e: any) => {
      // Find the clicked rect element
      const rect = e.target.closest("rect");
      if (rect) {
        const date = rect.getAttribute("data-date");
        const level = rect.getAttribute("data-level");
        console.log("Clicked:", { date, level });
      }
    };

    calendar.addEventListener("click", handleClick);

    return () => {
      calendar.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="w-full h-full relative overflow-y-scroll">
      {/* heading */}
      <div className="flex flex-col space-y-2 px-8 pt-8">
        <h1 className="text-3xl font-bold text-[#1E1E1E]">Bookings</h1>
        <p className="text-base text-[#6B7280]">Your booking history</p>
      </div>

      <div className="my-10 w-full px-8">
        <ActivityCalendar
          ref={calendarRef}
          data={data}
          showMonthLabels={true}
          showTotalCount={true}
          showColorLegend={true}
          colorScheme="light"
          showWeekdayLabels={true}
          blockMargin={6}
          tooltips={{
            activity: {
              text: (activity) =>
                `${activity.level} activities on ${activity.date}`,
            },
            colorLegend: {
              text: (level) => `Activity level ${level + 1}`,
            },
          }}
        />
      </div>

      <div className="my-14 space-y-14 px-8">
        <div className=" flex items-center justify-between sticky top-0 bg-[#F8F9FC] py-5">
          <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-2 border w-[400px] border-slate-400 px-4 py-2 rounded-lg">
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

          <div className="flex items-center space-x-2 bg-black text-white text-sm px-4 py-2 rounded-lg">
            Book now
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
                {bookings.map((booking, index) => (
                    <tr key={index}>
                        <td>{booking.id}</td>
                        <td>{booking.date}</td>
                        <td>{booking.time}</td>
                        <td className="text-green-700">{booking.status}</td>
                        <td>{booking.amount}</td>
                        <td>{booking.place}</td>
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

export default Bookings;
