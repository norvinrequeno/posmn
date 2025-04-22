import { useState } from "react";
import { FormasPagos as forma } from "../../types";
import useVenta from "./service/useVenta";
import { Check } from "lucide-react";

export default function FormasPagos({
  forma,
  setFormas,
}: {
  forma: forma;
  setFormas: (id: number, monto: number) => void;
}) {
  const { sumTotal } = useVenta();
  const [checked, setChecked] = useState(false);
  const [monto, setMonto] = useState<number>(0);
  const handleCheck = () => {
    const c = !checked;
    setChecked(c);
    if (!c) {
      setMonto(0);
      setFormas(forma.id, 0);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const m = e.target.value ? parseFloat(e.target.value) : 0;
    setMonto(m);
    setFormas(forma.id, m);
  };

  const setCompleto = () => {
    setMonto(sumTotal);
    setChecked(true);
    setFormas(forma.id, sumTotal);
  };
  return (
    <div className="relative">
      {!checked && (
        <button
          type="button"
          className="absolute top-0 right-0 z-30 bg-amber-200 px-3 py-1 rounded-lg cursor-pointer my-2 mx-1 text-sm"
          onClick={setCompleto}
        >
          <Check size={18} />
        </button>
      )}
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
            onChange={handleCheck}
            className="hidden"
          />
          <div
            className={`font-semibold ${
              checked && "mb-3"
            } transition-all duration-300`}
          >
            {forma.forma}
          </div>
          {checked && (
            <input
              type="number"
              value={monto}
              onChange={handleChange}
              className="w-full transition-all duration-300 appearance-none outline-none border-2 border-blue-300  py-2 px-4 bg-white rounded-2xl focus:ring-2 focus:ring-blue-400"
            />
          )}
        </div>
      </label>
    </div>
  );
}
