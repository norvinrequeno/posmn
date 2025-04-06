import { useState } from "react";

const Switch = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id="switch"
        checked={isChecked}
        onChange={handleToggle}
        className="toggle-checkbox hidden"
      />
      <label htmlFor="switch" className="mr-2 text-gray-700">
        <div
          className={`toggle-label w-10 h-4 rounded-full cursor-pointer flex items-center transition-all ease-in-out duration-300 ${
            isChecked ? "bg-green-600" : "bg-gray-300 border-2 border-slate-200"
          }`}
        >
          <div
            className={`toggle-circle w-4 h-4 bg-white rounded-full transition-transform transform ${
              isChecked ? "translate-x-6" : ""
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default Switch;
