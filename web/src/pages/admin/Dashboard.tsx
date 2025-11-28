import {
  IoIosCheckmarkCircleOutline,
  IoIosCloseCircleOutline,
  IoIosInformationCircleOutline,
} from "react-icons/io";

const statsInfo = [
  {
    title: "Total Bookings",
    value: "4",
    Icon: IoIosCheckmarkCircleOutline,
    iconBG: "#F3F4F6",
    iconColor: "#1900A9",
  },
  {
    title: "Total Charged",
    value: "100 kWh",
    Icon: IoIosCheckmarkCircleOutline,
    iconBG: "#D1FAE5",
    iconColor: "#10B981",
  },
  {
    title: "Paid",
    value: "100",
    Icon: IoIosCloseCircleOutline,
    iconBG: "#FEE2E2",
    iconColor: "#EF4444",
    percentageIncrease: "",
  },
  {
    title: "Stations Visited",
    value: "120",
    Icon: IoIosInformationCircleOutline,
    iconBG: "#F3F4F6",
    iconColor: "#6B7280",
  },
];

const AdminDashboard = () => {
  return (
    <div className="w-full h-full flex flex-col p-8">
      {/* heading */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-[#1E1E1E]">Dashboard</h1>
        <p className="text-base text-[#6B7280]">Good morning, Admin!</p>
      </div>

      {/* stats */}
      <div className="my-8 grid grid-cols-4 gap-10">
        {statsInfo.map((item, index) => (
          <div
            key={index}
            className="space-x-2 bg-white rounded-xl py-2 px-4 flex justify-between shadow-[0px_1px_3px_0px_#0000001A] "
          >
            <div className="flex flex-col space-y-2">
              <p className="text-xs text-[#6B7280]">{item.title}</p>

              <div className="flex items-start space-x-2">
                <p className="text-base text-[#1E1E1E] font-bold">
                  {item.value}
                </p>

                {item.percentageIncrease && (
                  <p className="text-[10px]">
                    <span className="text-[#10B981] font-medium">
                      {item.percentageIncrease}
                    </span>{" "}
                    <span className="text-[#9CA3AF]">vs last month</span>
                  </p>
                )}
              </div>
            </div>

            <div>
              <div
                className={`w-[28px] h-[28px] rounded-lg flex items-center justify-center`}
                style={{
                  backgroundColor: item.iconBG,
                }}
              >
                <item.Icon />
              </div>
            </div>
          </div>
        ))}
      </div>


        {/*  */}
      <div className="w-full flex-1 h-full flex items-center gap-8 overflow-y-hidden">

        <div className="flex-[0.4] w-full h-full bg-white shadow-[0px_1px_3px_0px_#0000001A] rounded-xl p-4 space-y-8">

        </div>


        <div className="flex-[0.6] w-full h-full bg-white shadow-[0px_1px_3px_0px_#0000001A] rounded-xl p-4 space-y-8">

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
