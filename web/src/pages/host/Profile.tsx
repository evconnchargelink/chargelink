import { useState } from "react";
import { LuCamera } from "react-icons/lu";

const HostProfile = () => {
  const [isProfileImgHovered, setIsProfileImgHovered] = useState(false);

  return (
    <div className="w-full h-full overflow-y-scroll">
      {/* banner */}
      <div className="w-full h-[200px] bg-gradient-to-b from-[#fff] to-[#68a6e592]"></div>

      <div className="relative w-full">
        <div className="w-full flex items-start space-x-8 -top-16 absolute p-8">
          <div
            className="w-[200px] h-[200px] rounded-full bg-slate-500 shrink-0 relative cursor-pointer"
            onMouseEnter={() => setIsProfileImgHovered(true)}
            onMouseLeave={() => setIsProfileImgHovered(false)}
          >
            <img
              src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
              alt="profile image"
              className="w-full h-full object-cover rounded-full"
            />

            {isProfileImgHovered && (
              <div className="w-[200px] h-[200px] rounded-full bg-black/50 absolute top-0 left-0 flex flex-col items-center justify-center space-y-3">
                <LuCamera className="text-4xl text-neutral-300"/>

                <p className="text-sm text-neutral-300">Change Profile Photo</p>
              </div>
            )}
          </div>

          <div className="w-full space-y-10 mt-20">
            <div className="w-full flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-3xl font-semibold">Ronak Paul</p>
                <p className="text-sm text-[#6B7280]">ronakpaul@gmail.com</p>
              </div>

              <button className="bg-black text-white px-4 py-2 rounded-lg text-sm">
                Edit Profile
              </button>
            </div>

            <div className="w-full flex flex-col space-y-5">
              <div className="w-full h-[300px] border border-slate-300 rounded-lg p-5">
                <div className="w-full flex items-center justify-between border-b border-b-slate-300 pb-4">
                  <p className="text-sm font-medium text-neutral-700">
                    Personal Information
                  </p>
                </div>
              </div>

              <div className="w-full h-[300px] border border-slate-300 rounded-lg p-5">
                <div className="w-full flex items-center justify-between border-b border-b-slate-300 pb-4">
                  <p className="text-sm font-medium text-neutral-700">
                    KYC Information
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

export default HostProfile;
