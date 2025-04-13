import { useEffect, useState } from "react";
import { AlertType, Categorias, Productos } from "../../types";
import api from "../../api";
import Alert from "../../components/Alert";
import { Save } from "lucide-react";
//cSpell:ignore categoria categorias
interface ProductosFormProps {
  producto?: Productos;
  setUpdate: (producto: Productos) => void;
}
export default function ProductosForm({
  producto,
  setUpdate,
}: ProductosFormProps) {
  const [name, setName] = useState(producto?.producto || "");
  const [detalle, setDetalle] = useState(producto?.detalle || "");
  const [categoriasId, setCategoriasId] = useState(producto?.categoria.id || 0);
  const [categoriasList, setCategoriasList] = useState<Categorias[]>([]);
  const [message, setMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState<AlertType>("info");

  const getCategorias = async () => {
    try {
      const { data, status } = await api.get("categorias/active");

      if (status === 200 && data) {
        setCategoriasList(data);
      } else {
        setMessage(
          "Ocurrió un error al encontrar las categorias, verifique que existan categorias."
        );
        setTypeAlert("error");
      }
    } catch (error) {
      console.error(error);
      setMessage(
        "Ocurrió un error al encontrar las categorias, verifique que existan categorias."
      );
      setTypeAlert("error");
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name === "" || (name && name.length < 3)) {
      setMessage("Debe agregar un nombre al producto de al menos 3 caracteres");
      setTypeAlert("warning");
      return;
    }

    if (categoriasId === 0 || categoriasId == null) {
      setMessage("Debe seleccionar una categoria");
      setTypeAlert("warning");
      return;
    }
    if (!producto) {
      create();
    } else update();
  };
  const create = async () => {
    try {
      console.log(name, detalle, categoriasId);

      const { data, status } = await api.post("productos", {
        producto: name,
        detalle: detalle,
        categorias_id: categoriasId,
      });
      if (status === 201 && data) {
        setMessage("Se guardo el cambio");
        setTypeAlert("success");
        setUpdate(data);
        setName("");
        setDetalle("");
        setCategoriasId(0);
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
      const { data, status } = await api.patch(`productos/${producto?.id}`, {
        producto: name,
        detalle: detalle,
        categorias_id: categoriasId,
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

  useEffect(() => {
    getCategorias();
  }, []);
  return (
    <form onSubmit={handleSubmit} className="bg-white">
      {message && (
        <div className="mb-4">
          <Alert message={message} type={typeAlert} setMessage={setMessage} />
        </div>
      )}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Producto
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Escribe aquí..."
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Detalle (opcional)
        </label>
        <textarea
          value={detalle}
          onChange={(e) => setDetalle(e.target.value)}
          className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Escribe aquí..."
        ></textarea>
      </div>
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700">
          Categoria
        </label>
        <select
          onChange={(e) => setCategoriasId(parseInt(e.target.value))}
          value={categoriasId}
          className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Seleccione una opción</option>
          {categoriasList &&
            categoriasList.map((c) => (
              <option value={c.id} key={c.id}>
                {c.categoria}
              </option>
            ))}
        </select>
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
