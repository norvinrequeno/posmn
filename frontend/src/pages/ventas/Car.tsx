import { DollarSign, Settings, ShoppingBag } from "lucide-react";
import FormasPagos from "./FormasPagos";
import CarItem from "./CarItem";
import { VentasDetalles } from "../../types";

export default function Car({
  list,
  removeProducto,
}: {
  list: VentasDetalles[];
  removeProducto: (id: number) => void;
}) {
  const formas = [
    { id: 1, forma: "Efectivo" },
    { id: 2, forma: "Tarjeta" },
  ];
  const sumTotal = list.reduce((acc, p) => acc + p.total, 0);
  return (
    <>
      <div className="text-xl text-slate-700 mb-4 font-bold flex gap-2 items-center">
        <ShoppingBag size={20} /> Venta
      </div>
      <div className="mb-6">
        {list &&
          list.map((l) => (
            <CarItem item={l} key={l.id} removeProducto={removeProducto} />
          ))}

        {list.length === 0 && <div>Aun sin agregar productos</div>}
      </div>
      <div className="flex justify-between border-t-2 border-slate-200 pt-4 mb-4">
        <div className="font-light">Total:</div>
        <div className="font-bold text-stone-600">${sumTotal.toFixed(2)}</div>
      </div>
      <div className="mb-5">
        <div className="w-full mb-3 font-semibold flex gap-2 items-center text-slate-700">
          <Settings size={20} /> Configurar pago
        </div>
        {formas &&
          formas.map((f) => (
            <div className="mb-2" key={f.id}>
              <FormasPagos label={f.forma} />
            </div>
          ))}
      </div>
      <div className="flex">
        <button
          type="button"
          className="py-3 px-4 w-full justify-center flex gap-2 bg-teal-500 text-gray-50 hover:bg-teal-400 hover:text-white rounded-lg cursor-pointer"
        >
          <DollarSign size={22} />
          Cobrar
        </button>
      </div>
    </>
  );
}
