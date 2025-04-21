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
    <div className="flex w-full shadow bg-indigo-200 rounded-xl px-4 py-5 gap-2  items-center justify-between mb-3">
      <div className="w-20">
        <div className="flex bg-slate-200 hover:bg-slate-100 rounded-lg py-2 gap-2 items-center justify-center">
          <div className="text-gray-700">
            <button
              onClick={() => setCantidad(cantidad + 1)}
              type="button"
              className="border-0 focus:ring-0 active:border-0 cursor-pointer"
            >
              <Plus size={15} />
            </button>
          </div>
          <div className="text-sm">{cantidad}</div>
          <div className="text-gray-700">
            <button
              onClick={() => (cantidad > 1 ? setCantidad(cantidad - 1) : "")}
              type="button"
              className="border-0 focus:ring-0 active:border-0 cursor-pointer"
            >
              <Minus size={15} />
            </button>
          </div>
        </div>
      </div>
      <div className="w-4/6 flex justify-between text-slate-700 font-bold">
        <div className="flex items-center gap-2">
          {item.producto.producto}
          <span className="text-sm font-medium">{item.detalle}</span>
        </div>
        <div className="flex justify-center items-center">
          ${item.precio.toFixed(2)}
        </div>
      </div>
      <button
        className="flex items-center justify-center gap-2 bg-slate-200 hover:bg-slate-100 py-2 px-4 rounded-2xl cursor-pointer"
        disabled={cantidad < 1}
        onClick={handlerAdd}
      >
        <Plus size={18} className="cursor-pointer" /> Agregar
      </button>
    </div>
  );
}
