import { Minus, Plus } from "lucide-react";
import { useState } from "react";
interface ItemProp {
  item: {
    cantidad: number;
    producto: string;
    precio: number;
  };
}
export default function AddItem({ item }: ItemProp) {
  const [cantidad, setCantidad] = useState(item.cantidad);
  return (
    <div className="flex w-full shadow bg-teal-400 rounded-xl px-4 py-4 gap-2  items-center justify-between mb-3">
      <div className="w-20">
        <div className="flex bg-slate-200 rounded-lg py-2 gap-2 items-center justify-center">
          <div className="text-gray-500">
            <button
              onClick={() => setCantidad(cantidad + 1)}
              type="button"
              className="border-0 focus:ring-0 active:border-0 cursor-pointer"
            >
              <Plus size={15} />
            </button>
          </div>
          <div className="text-sm">{cantidad}</div>
          <div className="text-gray-500">
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
      <div className="w-4/6 flex justify-between">
        <div className="text-gray-50 font-semibold">{item.producto}</div>
        <div className="text-gray-50 flex justify-center items-center font-bold">
          ${item.precio.toFixed(2)}
        </div>
      </div>
      <button className="flex items-center justify-center gap-2 bg-slate-200 hover:bg-slate-100 py-2 px-4 rounded-2xl cursor-pointer">
        <Plus size={18} className="cursor-pointer" /> Add
      </button>
    </div>
  );
}
