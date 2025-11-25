import { LuCheck } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useState } from "react";

const NotificationCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex items-center justify-between px-2 py-2 rounded-xl hover:bg-neutral-100 hover:scale-[1.01] transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* left section */}
      <div className="flex items-center space-x-5">
        <div className="flex items-center space-x-3">
          <div className="w-[8px] h-[8px] rounded-full bg-green-500"></div>

          <div className="w-[40px] h-[40px] rounded-xl">
            <img
              src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
              alt="user profile"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-1">
          <p className="font-medium text-sm">
            This is a simple notification text
          </p>

          <div className="flex items-center space-x-4 text-xs text-neutral-500">
            <p>July 21, 2025</p>

            <div className="w-[3px] h-[15px] bg-slate-200"></div>
            <p>10:20 AM</p>
          </div>
        </div>
      </div>

      {/* right section */}
      <div className="flex items-center space-x-4">
        {isHovered && (
          <>
            <div className="w-[35px] h-[35px] rounded-lg border border-neutral-300 flex items-center justify-center cursor-pointer">
              <RiDeleteBin5Line className="text-sm text-neutral-500" />
            </div>

            <div className="w-[35px] h-[35px] rounded-lg border border-neutral-300 flex items-center justify-center cursor-pointer">
              <LuCheck className="text-sm text-neutral-500" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationCard;
