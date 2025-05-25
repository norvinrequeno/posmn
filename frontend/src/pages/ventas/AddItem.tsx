import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Precios } from "../../types";
import useVenta from "./service/useVenta";

export default function AddItem({ item }: { item: Precios }) {
  const [cantidad, setCantidad] = useState(1);
  const { addProducto } = useVenta();
  const handlerAdd = () => {
    if (cantidad > 0) {
      addProducto(cantidad, item.id);
      setCantidad(1);
    }
  };
  return (
    <div className="flex flex-col sm:flex-row w-full shadow bg-indigo-200 rounded-xl px-4 py-4 gap-1 lg:gap-3 items-stretch justify-between mb-3">
      <div className="w-full sm:w-24">
        <div className="flex bg-slate-200 hover:bg-slate-100 rounded-lg py-2 gap-3 items-center justify-between px-5">
          <button
            onClick={() => setCantidad(cantidad + 1)}
            type="button"
            className="cursor-pointer"
          >
            <Plus size={16} />
          </button>
          <div className="text-sm font-semibold">{cantidad}</div>
          <button
            onClick={() => (cantidad > 1 ? setCantidad(cantidad - 1) : null)}
            type="button"
            className="cursor-pointer"
          >
            <Minus size={16} />
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-slate-700 font-bold w-full">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
          <span className="text-center lg:text-left">
            {item.producto.producto}
          </span>
          <span className="text-sm font-medium hidden lg:block">
            {item.detalle}
          </span>
        </div>
        <div className="text-center sm:text-right mt-1 sm:mt-0">
          ${item.precio.toFixed(2)}
        </div>
      </div>

      <div className="w-full sm:w-auto">
        <button
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-200 hover:bg-slate-100 py-2 px-4 rounded-2xl cursor-pointer"
          disabled={cantidad < 1}
          onClick={handlerAdd}
        >
          <Plus size={18} className="cursor-pointer" /> Agregar
        </button>
      </div>
    </div>
  );
}
