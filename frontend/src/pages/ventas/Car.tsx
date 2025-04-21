import { DollarSign, Settings, ShoppingBag } from "lucide-react";
import FormasPagos from "./FormasPagos";
import CarItem from "./CarItem";
import useVenta from "./service/useVenta";
import { useState } from "react";
type formasType = {
  id: number;
  monto: number;
};
export default function Car() {
  const { carList, removeProducto, formasPagos, sumTotal } = useVenta();
  const [formasSelected, setFormasSelected] = useState<formasType[]>([]);
  const setFormas = (id: number, monto: number) => {
    setFormasSelected((prev) => {
      const exist = prev.find((f) => f.id === id);
      if (exist) {
        if (monto === 0 || monto === null) {
          console.log("eliminar");

          return prev.filter((f) => f.id !== id);
        } else return prev.map((f) => (f.id === id ? { id, monto } : f));
      }
      return monto !== 0 ? [...prev, { id, monto }] : prev;
    });
  };

  const selectedSum = formasSelected.reduce((acc, p) => {
    const m = p.monto ? parseFloat(p.monto + "") : 0;
    return acc + m;
  }, 0);

  const faltante = sumTotal - selectedSum;

  const facturarVenta = () => {
    alert("Facturar venta");
  };
  return (
    <>
      <div className="text-xl text-slate-700 mb-4 font-bold flex gap-2 items-center">
        <ShoppingBag size={20} /> Venta
      </div>
      <div className="mb-6">
        {carList &&
          carList.map((l) => (
            <CarItem item={l} key={l.id} removeProducto={removeProducto} />
          ))}

        {carList.length === 0 && <div>Aun sin agregar productos</div>}
      </div>
      <div className="flex justify-between border-t-2 border-slate-200 pt-4 mb-4">
        <div className="font-light">Total:</div>
        <div className="font-bold text-stone-600">${sumTotal.toFixed(2)}</div>
      </div>
      {sumTotal > 0 && (
        <div className="mb-5">
          <div className="w-full  font-semibold flex gap-2 items-center text-slate-700 mb-5">
            <Settings size={20} /> Configurar pago
          </div>
          {formasPagos &&
            formasPagos.map((f) => (
              <div className="mb-2" key={f.id}>
                <FormasPagos forma={f} setFormas={setFormas} />
              </div>
            ))}

          <div
            className={`flex my-2 ${
              faltante !== 0 ? "text-red-800" : "text-teal-800"
            }`}
          >
            {faltante !== 0 ? (
              <span> Faltante: ${(sumTotal - selectedSum).toFixed(2)}</span>
            ) : (
              "Monto correcto"
            )}
          </div>
          <div className="flex">
            <button
              type="button"
              disabled={faltante !== 0}
              className={`py-3 px-4 w-full justify-center flex gap-2  rounded-lg cursor-pointer ${
                faltante !== 0
                  ? "bg-gray-300 text-gray-700 cursor-wait"
                  : "bg-teal-500 text-gray-50 hover:bg-teal-400 hover:text-white"
              }`}
              onClick={facturarVenta}
            >
              <DollarSign size={22} />
              Cobrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
