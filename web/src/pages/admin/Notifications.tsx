import { useState } from "react";
import NotificationCard from "../../components/NotificationCard";


const AllTab = () => {

    return (
        <div className="flex flex-col space-y-4">
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
        </div>
    )
}

const UnreadTab = () => {
    return (
        <div className="flex flex-col space-y-4">

        </div>
    )
}

const AdminNotifications = () => {
  const [currentTab, setCurrentTab] = useState<"all" | "unread">("all");

  return (
    <div className="w-full h-full overflow-y-scroll">
      {/* heading */}
      <div className="flex flex-col space-y-2 px-8 pt-8">
        <h1 className="text-3xl font-bold text-[#1E1E1E]">Notifications</h1>
        <p className="text-base text-[#6B7280]">
          Your notifications from bookings and chargers are listed here
        </p>
      </div>

      <div className="my-4 w-full px-8">

        <div className="py-6 sticky top-0 z-10 bg-[#F8F9FC]">
        <div className="flex items-center space-x-5 border-b border-b-slate-200 ">
          <div
            onClick={() => {
              setCurrentTab("all");
            }}
            className={`pb-1 px-5 border-b  cursor-pointer ${
              currentTab === "all" ? "border-b-black" : "border-b-transparent text-neutral-500"
            }`}
          >
            <p className="text-sm">All</p>
          </div>

          <div
            onClick={() => {
              setCurrentTab("unread");
            }}
            className={`pb-1 px-5 border-b cursor-pointer ${
              currentTab === "unread"
                ? "border-b-black"
                : "border-b-transparent text-neutral-500"
            }`}
          >
            <p className="text-sm">Unread (5)</p>
          </div>
        </div>
        </div>


        <div className="pb-16">
          {currentTab === "all" ? <AllTab /> : <UnreadTab />}
        </div>
      </div>
    </div>
  );
};

export default AdminNotifications;
