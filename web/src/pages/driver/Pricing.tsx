import { FaCheck } from "react-icons/fa";

const Pricing = () => {
  return (
    <div className="flex items-center justify-center space-x-11">
      <div className="flex flex-col p-8 w-[400px] h-[500px] justify-between border border-black">
        <div className="flex flex-col space-y-14">
          <div className="flex flex-col items-center justify-center space-y-4">
            <p className="text-lg font-semibold">Residential</p>
            <p className="text-4xl font-bold">₹8/kWh</p>

            <p className="text-base ">or ₹9999 yearly</p>
          </div>

          <div className="flex flex-col space-y-2">
            {[
              "Real-time availability",
              "Book slots in advance",
              "No hidden charges",
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <FaCheck />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>

        <button className=" w-full bg-black text-white py-3">Calculate</button>
      </div>

      <div className="flex flex-col p-8 w-[400px] h-[500px] justify-between border border-black">
        <div className="flex flex-col space-y-14">
          <div className="flex flex-col items-center justify-center space-y-4">
            <p className="text-lg font-semibold">Business plan</p>
            <p className="text-4xl font-bold">₹10/kWh</p>

            <p className="text-base ">or ₹19999 yearly</p>
          </div>

          <div className="flex flex-col space-y-2">
            {[
              "Mobile app access",
              "24/7 customer support",
              "Priority booking",
              "Dedicated account manager",
              "Bulk discounts available",
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <FaCheck />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full bg-black text-white py-3">Calculate</button>
      </div>
    </div>
  );
};

export default Pricing;
