import { Plus } from "lucide-react";
import { Ventas } from "../../types";
import { Link } from "react-router-dom";

export default function VentaTicket({ venta }: { venta: Ventas }) {
  const fecha = new Date(venta.fecha).toLocaleDateString("es-SV", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "America/El_Salvador",
  });

  const hora = new Date(venta.fecha).toLocaleTimeString("es-SV", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "America/El_Salvador",
  });

  return (
    <div className="relative bg-white rounded-xl w-full max-w-xs mx-auto my-2 px-5 py-6 font-mono text-sm overflow-hidden h-64">
      <div className="absolute top-0 left-[-12px] h-full flex items-center">
        <div className="w-6 h-6 rounded-full bg-gray-200 shadow-inner"></div>
      </div>
      <div className="absolute top-0 right-[-12px] h-full flex items-center">
        <div className="w-6 h-6 rounded-full bg-gray-200 shadow-inner"></div>
      </div>

      <div className="border-b border-dashed border-gray-400 pb-2 text-center">
        <h3 className="text-base font-bold">{venta.titular ?? "Cliente"}</h3>
        <p className="text-gray-600">
          Venta #{String(venta.id).padStart(6, "0")}
        </p>
      </div>

      <div className="py-2 mt-4 text-gray-700">
        <p>
          <span className="font-semibold">Fecha: </span>
          {fecha}
        </p>
        <p>
          <span className="font-semibold">Hora: </span>
          {hora}
        </p>
        <p>
          <span className="font-semibold">Usuario: </span> {venta.user.name}
        </p>
      </div>

      <div className="pt-6 flex justify-end gap-2">
        <Link
          to={`/ventas/${venta.id}`}
          className="flex-1 flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-md transition"
        >
          <Plus size={18} /> Agregar productos
        </Link>
      </div>
    </div>
  );
}
