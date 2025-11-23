const Profile = () => {
  return (
    <div className="w-full h-full">
      {/* banner */}
      <div className="w-full h-[200px] bg-gradient-to-b from-[#fff] to-[#68a6e592]"></div>

      <div className="relative w-full">
        <div className="w-full flex items-center space-x-8 -top-16 absolute p-8">
          <div className="w-[200px] h-[200px] rounded-full bg-slate-500 shrink-0">
            <img
              src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
              alt="profile image"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <div className="w-full">
            <div className="w-full flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-3xl font-semibold">Ronak Paul</p>
                <p className="text-sm text-[#6B7280]">ronakpaul@gmail.com</p>
              </div>

              <button className="bg-black text-white px-4 py-2 rounded-lg text-sm">Edit Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
