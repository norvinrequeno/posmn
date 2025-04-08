import { Pencil, Plus, TrashIcon } from "lucide-react";
import Layout from "../../components/Layout";
import Switch from "../../components/Switch";
import { useEffect, useState } from "react";
import { AlertType, Categorias } from "../../types";
import api from "../../api";
import Spinner from "../../components/Spinner";
import Alert from "../../components/Alert";
import Modal from "../../components/Modal";
import CategoriaForm from "./CategoriaForm";
//cSpell:ignore categorias categoria
export default function CategoriasPage() {
  const [list, setList] = useState<Categorias[]>([]);
  const [uCategoria, setUCategoria] = useState<Categorias>();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState<AlertType>("info");
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [search, setSearch] = useState("");
  const getList = async () => {
    try {
      setLoading(true);
      const { data, status } = await api.get("categorias");
      if (status === 200 && data) {
        setList(data);
      } else setMessage("No se encontraron registros");
    } catch (error) {
      console.error(error);
      setMessage(
        "Ocurrió un error al cargar los registro, verifique la conexión con el servidor"
      );
      setTypeAlert("error");
    } finally {
      setLoading(false);
    }
  };
  const setUpdate = (categoria: Categorias) => {
    const index = list?.findIndex((c) => categoria.id === c.id);
    if (index !== -1) {
      setList((prev) => {
        const updateList = [...prev];
        updateList[index] = categoria;
        return updateList;
      });
    } else {
      setList((prev) => [...prev, categoria]);
    }
  };

  const setEdit = (categoria: Categorias) => {
    setUCategoria(categoria);
    setEditModal(true);
  };

  const destroy = async (categoria: Categorias) => {
    if (
      confirm(`¿Esta seguro de borrar el registro: ${categoria.categoria}?`)
    ) {
      try {
        const { status } = await api.delete(`categorias/${categoria.id}`);
        if (status === 200) {
          setList(list.filter((c) => c.id !== categoria.id));
          setMessage("Se elimino el registro");
          setTypeAlert("success");
        }
      } catch (error) {
        console.error(error);
        setMessage("Ocurrió un error al borrar");
        setTypeAlert("success");
      }
    }
  };

  const getSearch = (): Categorias[] => {
    if (search === "" || search.length === 0) {
      return list;
    } else {
      const reg = new RegExp(search, "i");
      return list.filter((l) => reg.test(l.categoria));
    }
  };

  const result = getSearch();
  useEffect(() => {
    getList();
  }, []);
  if (loading) return <Spinner />;
  return (
    <Layout title="Categorías">
      <div className="w-full h-full bg-white  rounded-2xl p-6">
        <div className="flex text-lg mb-5 text-gray-700">
          Listado de categorías
        </div>
        <div className="flex mb-4 gap-3">
          <div className="sm:w-full md:w-12/12 lg:w-2/12">
            <button
              onClick={() => setAddModal(true)}
              className="flex gap-2 bg-amber-800 text-white px-4 py-2 rounded hover:bg-amber-900 transition ease-in-out duration-300 cursor-pointer"
            >
              <Plus size={20} />
              Agregar
            </button>
          </div>
          <input
            type="text"
            className="p-2 border-gray-500 border rounded-xl focus:border-green-600 sm:w-full md:w-12/12 lg:w-11/12"
            placeholder="Buscar..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {message && (
          <div className="mb-4">
            <Alert message={message} type={typeAlert} setMessage={setMessage} />
          </div>
        )}
        {list && list.length > 0 && (
          <div className="overflow-x-auto bg-white rounded-lg">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-slate-900">
                  <th className="px-4 py-2 text-left font-semibold text-slate-50 w-1/12">
                    Acciones
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-slate-50 w-1/12">
                    Estado
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-slate-50">
                    Categorías
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.map((m) => (
                  <tr className=" hover:bg-gray-50" key={m.id}>
                    <td className="px-4 py-2">
                      <button
                        className="text-slate-600 hover:text-blue-800"
                        onClick={() => setEdit(m)}
                      >
                        <Pencil size={18} absoluteStrokeWidth />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 ml-2"
                        onClick={() => destroy(m)}
                      >
                        <TrashIcon size={18} absoluteStrokeWidth />
                      </button>
                    </td>
                    <td className="px-4 py-2">
                      <Switch status={m.estado} id={m.id} />
                    </td>
                    <td className="px-4 py-2">{m.categoria}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Modal
        isOpen={addModal}
        setIsOpen={setAddModal}
        title="Agregar una categoría"
        size="md"
      >
        <CategoriaForm setUpdate={setUpdate} />
      </Modal>
      <Modal
        isOpen={editModal}
        setIsOpen={setEditModal}
        title={`Editar categoría: ${uCategoria?.categoria}`}
        size="md"
      >
        <CategoriaForm setUpdate={setUpdate} categoria={uCategoria} />
      </Modal>
    </Layout>
  );
}
