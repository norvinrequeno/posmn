import { useState } from "react";
import Alert from "../../components/Alert";
import { AlertType } from "../../types";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { Eraser, Save } from "lucide-react";

export default function NuevaVentaForm() {
  const [name, setName] = useState("Mesa ");
  const [message, setMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState<AlertType>("info");
  const nav = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, status } = await api.post("ventas", { titular: name });
      if (status === 201) {
        nav(`/ventas/${data.id}`);
      } else {
        setTypeAlert("error");
        setMessage("Algo salio mal, actualice e intente de nuevo.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="bg-white">
      {message && (
        <div className="mb-4">
          <Alert message={message} type={typeAlert} setMessage={setMessage} />
        </div>
      )}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Titular
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Escribe aquí..."
        />
      </div>
      <div className="flex gap-3 ">
        <button
          type="submit"
          className="flex gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          <Save size={20} />
          Guardar
        </button>
        <button
          type="button"
          onClick={() => setName("")}
          className="flex gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition"
        >
          <Eraser size={20} />
          Limpiar
        </button>
      </div>
    </form>
  );
}
