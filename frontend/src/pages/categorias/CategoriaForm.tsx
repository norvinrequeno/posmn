import React, { useState } from "react";
import { AlertType, Categorias } from "../../types";
import { Save } from "lucide-react";
import Alert from "../../components/Alert";
import api from "../../api";

interface CategoriaFormProps {
  categoria?: Categorias;
  setUpdate: (categoria: Categorias) => void;
}
export default function CategoriaForm({
  categoria,
  setUpdate,
}: CategoriaFormProps) {
  const [name, setName] = useState(categoria?.categoria || "");
  const [message, setMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState<AlertType>("info");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name === "" || (name && name.length < 3)) {
      setMessage("La categoría debe contener al menos 3 caracteres.");
      setTypeAlert("warning");
    }
    if (!categoria) {
      create();
    } else update();
  };
  const create = async () => {
    try {
      const { data, status } = await api.post("categorias", {
        categoria: name,
      });
      if (status === 201 && data) {
        setMessage("Se guardo el cambio");
        setTypeAlert("success");
        setUpdate(data);
        setName("");
      } else {
        setMessage("Ocurrió un error al intentar guardar los cambios");
        setTypeAlert("error");
      }
    } catch (error) {
      console.error(error);
      setMessage(`Ocurrió un error al intentar guardar los cambios`);
      setTypeAlert("error");
    }
  };
  const update = async () => {
    try {
      const { data, status } = await api.patch(`categorias/${categoria?.id}`, {
        categoria: name,
      });
      if (status === 200 && data) {
        setMessage("Se guardo el cambio");
        setTypeAlert("success");
        setUpdate(data);
      } else {
        setMessage("Ocurrió un error al intentar guardar los cambios");
        setTypeAlert("error");
      }
    } catch (error) {
      console.error(error);
      setMessage(`Ocurrió un error al intentar guardar los cambios`);
      setTypeAlert("error");
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
          Categoría
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Escribe aquí..."
        />
      </div>

      <button
        type="submit"
        className="flex gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        <Save size={20} />
        Guardar
      </button>
    </form>
  );
}
