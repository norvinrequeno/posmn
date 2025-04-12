import { useState } from "react";

export default function FormasPagos({ label }: { label: string }) {
  const [checked, setChecked] = useState(false);

  return (
    <label
      className={`block cursor-pointer rounded-xl border p-3 transition-colors duration-300 ${
        checked
          ? "bg-blue-200 border-blue-500 text-blue-800"
          : "bg-white border-gray-300 text-gray-700"
      }`}
    >
      <div
        className={`${
          !checked && "flex justify-center"
        } transition-all duration-300`}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
          className="hidden"
        />
        <div
          className={`font-semibold ${
            checked && "mb-3"
          } transition-all duration-300`}
        >
          {label}
        </div>
        {checked && (
          <input
            type="number"
            className="transition-all duration-300 appearance-none outline-none border-2 border-blue-300  py-2 px-4 bg-white rounded-2xl focus:ring-2 focus:ring-blue-400"
          />
        )}
      </div>
    </label>
  );
}
