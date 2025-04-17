import { Trash2 } from "lucide-react";
import { VentasDetalles } from "../../types";

export default function CarItem({
  item,
  removeProducto,
}: {
  item: VentasDetalles;
  removeProducto: (id: number) => void;
}) {
  return (
    <div className="flex w-full shadow bg-slate-200 rounded-xl px-4 py-4 gap-3  items-center justify-center mb-3">
      <div className="w-1/6">
        <div className="flex  rounded-lg py-2 gap-2 items-center justify-center">
          <div className="text-sm">{item.cantidad}</div>
        </div>
      </div>
      <div className="w-4/6 flex justify-between">
        <div>{item.precio.producto.producto}</div>
        <div className="flex justify-center items-center text-sm">
          ${item.precio.precio.toFixed(2)}
        </div>
      </div>
      <div className="w-1/6 flex items-center justify-center">
        <button type="button" onClick={() => removeProducto(item.id)}>
          <Trash2 size={18} className="cursor-pointer" />
        </button>
      </div>
    </div>
  );
}
