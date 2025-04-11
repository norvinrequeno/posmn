import { Check } from "lucide-react";
import { useState } from "react";
import api from "../../api";
import { Precios } from "../../types";

export default function PreciosAddForm({
  producto_id,
  updateList,
}: {
  producto_id: number;
  updateList: (precio: Precios) => void;
}) {
  const [precio, setPrecio] = useState(0);
  const [detalle, setDetalle] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (precio <= 0) return;
      const { data, status } = await api.post("precios", {
        producto_id,
        precio,
        detalle,
      });
      if (status === 201) {
        updateList(data);
        setPrecio(0);
        setDetalle("");
      } else alert("Ocurrió un error al intentar agregar, revise la conexión");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow px-4 py-2 flex flex-col gap-4 border border-gray-100 mb-4"
    >
      <div className="flex justify-between items-center">
        <div className="w-full pr-5">
          <div className="flex items-center gap-5">
            <label className="w-2/12">Precio</label>
            <input
              type="number"
              value={precio}
              step={0.01}
              min={0.01}
              onChange={(e) => setPrecio(parseFloat(e.target.value))}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-teal-500"
              placeholder="Escribe aquí..."
            />
          </div>
          <div className="flex items-center gap-5">
            <label className="w-2/12">Detalles</label>
            <input
              type="text"
              value={detalle}
              onChange={(e) => setDetalle(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-teal-500"
              placeholder="Describa cuando debe utilizarse (opcional)"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <button
            type="submit"
            className="flex gap-2 px-2 py-2 hover:bg-teal-600 hover:text-white rounded-lg text-gray-900 transition"
          >
            <Check size={24} absoluteStrokeWidth={true} />
          </button>
        </div>
      </div>
    </form>
  );
}
