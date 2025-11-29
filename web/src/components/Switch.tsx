import { useEffect, useState } from "react";

const CustomSwitch = ({defaultChecked}: {defaultChecked: boolean}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(defaultChecked);
  }, [defaultChecked]);

  return (
    <button
      onClick={() => setIsChecked(!isChecked)}
      className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors duration-300 ${
        isChecked ? "bg-black" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-300 ${
          isChecked ? "translate-x-[17px]" : "translate-x-1"
        }`}
      />
    </button>
  );
};

export default CustomSwitch;
