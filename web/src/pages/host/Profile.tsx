import { useState } from "react";
import { FaExpand } from "react-icons/fa";
import { LuCamera } from "react-icons/lu";
import Modal from "../../components/Modal";

const ExpandedDocModal = ({
  open,
  onClose,
  imgURL,
}: {
  open: boolean;
  onClose: () => void;
  imgURL: string;
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div
        className="w-[70%] h-[70%] bg-white rounded-xl p-6 flex items-center justify-center"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <img
          src={imgURL}
          className="w-full h-full object-contain object-center rounded-lg"
        />
      </div>
    </Modal>
  );
};

const DocCard = ({ imgURL }: { imgURL: string }) => {
  const [isHovered, setIsHovered] = useState(true);

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <ExpandedDocModal
        open={isExpanded}
        onClose={() => setIsExpanded(false)}
        imgURL={imgURL}
      />

      <div
        className="w-[200px] h-[80px] bg-slate-200 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-lg border border-slate-200 relative"
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
      >
        <img
          src={imgURL}
          className="w-full h-full object-cover object-center rounded-lg"
        />

        {isHovered && (
          <div
            className="w-full h-full bg-black/50 absolute top-0 left-0 rounded-lg flex items-center justify-center"
            onClick={() => setIsExpanded(true)}
          >
            <FaExpand className="text-2xl text-neutral-300 cursor-pointer" />
          </div>
        )}
      </div>
    </>
  );
};

const HostProfile = () => {
  const [isProfileImgHovered, setIsProfileImgHovered] = useState(false);

  return (
    <div className="w-full h-full overflow-y-scroll">
      {/* banner */}
      <div className="w-full h-[200px] bg-gradient-to-b from-[#fff] to-[#68a6e592]"></div>

      <div className="relative w-full">
        <div className="w-full flex items-start space-x-8 -top-16 absolute p-8">
          <div className="sticky top-6">
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
                  <LuCamera className="text-4xl text-neutral-300" />

                  <p className="text-sm text-neutral-300">
                    Change Profile Photo
                  </p>
                </div>
              )}
            </div>
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
              <div className="w-full h-fit border border-slate-300 rounded-lg p-5">
                <div className="w-full flex items-center justify-between border-b border-b-slate-300 pb-4">
                  <p className="text-sm font-medium text-neutral-700">
                    Personal Information
                  </p>
                </div>

                <div className="w-full mt-4 flex flex-col space-y-10">
                  <div className="flex items-center space-x-28">
                    <div className="flex flex-col space-y-2">
                      <p className="text-sm text-neutral-400">Name</p>
                      <p className="text-sm text-[#6B7280]">Ronak Paul</p>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <p className="text-sm text-neutral-400">Email</p>
                      <p className="text-sm text-[#6B7280]">
                        ronakpaul@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-28">
                    <div className="flex flex-col space-y-2">
                      <p className="text-sm text-neutral-400">Address</p>
                      <p className="text-sm text-[#6B7280]">123 Main St</p>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <p className="text-sm text-neutral-400">Phone</p>
                      <p className="text-sm text-[#6B7280]">+1234567890</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-28">
                    <div className="flex flex-col space-y-2">
                      <p className="text-sm text-neutral-400">Gender</p>
                      <p className="text-sm text-[#6B7280]">Male</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-fit border border-slate-300 rounded-lg p-5">
                <div className="w-full flex items-center justify-between border-b border-b-slate-300 pb-4">
                  <p className="text-sm font-medium text-neutral-700">
                    KYC Information
                  </p>
                </div>

                <div className="w-full mt-4 flex flex-col space-y-10">
                  <div className="flex items-center space-x-28">
                    <div className="flex flex-col space-y-2">
                      <p className="text-sm text-neutral-400">Adhaar Number</p>
                      <p className="text-sm text-[#6B7280]">123456789012</p>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <p className="text-sm text-neutral-400">PAN Number</p>
                      <p className="text-sm text-[#6B7280]">123456789012</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-20">
                    <div className="flex flex-col space-y-2">
                      <p className="text-sm text-neutral-400">Adhaar Front</p>

                      <DocCard imgURL="https://i.pinimg.com/736x/13/48/19/1348191a4d1dda185edd1c6ee32436f0.jpg" />
                    </div>

                    <div className="flex flex-col space-y-2">
                      <p className="text-sm text-neutral-400">Adhaar Back</p>

                      <DocCard imgURL="https://imgv2-1-f.scribdassets.com/img/document/513327731/original/58cda8852b/1?v=1" />
                    </div>

                    <div className="flex flex-col space-y-2">
                      <p className="text-sm text-neutral-400">PAN Front</p>

                      <DocCard imgURL="https://www.pancardapp.com/blog/wp-content/uploads/2019/04/sample-pan-card.jpg" />
                    </div>
                  </div>
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
