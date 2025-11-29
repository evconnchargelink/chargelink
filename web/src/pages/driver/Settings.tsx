import { useState } from "react";
import CustomSwitch from "../../components/Switch";

const SwitchSetting = ({label, defaultChecked = false}: {label: string, defaultChecked?: boolean}) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm">{label}</p>

      <CustomSwitch defaultChecked={defaultChecked} />
    </div>
  );
};

const NotificationsSettings = () => {
  return (
    <div>
      <div className="border-b border-b-slate-200 pb-4">
        <h2 className="text-xl font-semibold text-[#1E1E1E]">Notification</h2>
      </div>

      <div className="my-4 space-y-5">
        <SwitchSetting label="Latest chargelink update notifications" defaultChecked />
        <SwitchSetting label="Booking notifications" defaultChecked />
        <SwitchSetting label="Security notifications" />
      </div>
    </div>
  );
};

const SecuritySettings = () => {
  return (
    <div>
      <div className="border-b border-b-slate-200 pb-4">
        <h2 className="text-xl font-semibold text-[#1E1E1E]">Security</h2>
      </div>

      <div className="my-4 space-y-5">
        <SwitchSetting label="Two-factor authentication" />
      </div>
    </div>
  );
};
const BillingSettings = () => {
  return (
    <div>
      <div className="border-b border-b-slate-200 pb-4">
        <h2 className="text-xl font-semibold text-[#1E1E1E]">Billing</h2>
      </div>

      <div className="my-4 space-y-5">
        <SwitchSetting label="Auto-renewal" />
      </div>
    </div>
  );
};

const tabs = [
  {
    id: "notification",
    label: "Notification",
    component: NotificationsSettings,
  },
  { id: "security", label: "Security", component: SecuritySettings },
  { id: "billing", label: "Billing", component: BillingSettings },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("notification");

  return (
    <div className="w-full h-full p-8">
      {/* heading */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-[#1E1E1E]">Settings</h1>
        <p className="text-base text-[#6B7280]">
          Manage your account settings, preferences, and notifications
        </p>
      </div>

      <div className="my-8 flex gap-x-5 flex-1 h-full">
        {/* left tab section */}
        <div className="flex-[0.2] h-full border-r border-r-slate-300 pr-4">
          <ul className="space-y-2">
            {tabs.map((tab) => (
              <li
                key={tab.id}
                className={`py-2 px-4  rounded-lg cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-gray-200 font-medium"
                    : "hover:bg-gray-100 font-normal"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Right display section */}
        <div className="flex-[0.8]">
          {tabs
            .filter((tab) => tab.id === activeTab)
            .map((tab) => tab.component())}
        </div>
      </div>
    </div>
  );
};

export default Settings;
