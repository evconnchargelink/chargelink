
const CreditCardFront = () => {
  return <div className="rounded-2xl bg-[#1F1F1F] w-[90%] h-[270px] "></div>;
};

const CreditCardBack = () => {
  return <div className="rounded-2xl bg-[#1F1F1F] w-[90%] h-[270px] "></div>;
};

const Wallet = () => {
  return (
    <div className="w-full h-full p-8">
      {/* heading */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-[#1E1E1E]">Wallet</h1>
        <p className="text-base text-[#6B7280]">Your wallet balance</p>
      </div>

      {/* wallet balance section */}
      <div className="w-full h-[300px] flex-1 flex gap-8 my-8">
        <div className="flex-[0.4] w-full h-full bg-white shadow-[0px_1px_3px_0px_#0000001A] rounded-xl p-4 space-y-8">
          <div className="space-y-4">
            <p className="text-sm text-[#6B7280]">Wallet Balance</p>
            <p className="text-4xl font-bold text-[#1E1E1E]">₹1000</p>
          </div>
        </div>

        <div className="flex-[0.6] w-full h-full bg-white shadow-[0px_1px_3px_0px_#0000001A] rounded-xl p-4 flex items-center justify-center">
         <CreditCardFront />
        </div>
      </div>
    </div>
  );
};

export default Wallet;
