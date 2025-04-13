import { useEffect, useState } from "react";
import { AlertType, Productos } from "../../types";
import api from "../../api";
import Spinner from "../../components/Spinner";
import Layout from "../../components/Layout";
import { DollarSign, Pencil, Plus, TrashIcon } from "lucide-react";
import Alert from "../../components/Alert";
import Switch from "../../components/Switch";
import Modal from "../../components/Modal";
import ProductosForm from "./ProductosForm";

import PreciosList from "../precios/PreciosList";
//cSpell:ignore categorias categoria
export default function ProductosPage() {
  const [list, setList] = useState<Productos[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState<AlertType>("info");
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [preciosModal, setPreciosModal] = useState(false);
  const [search, setSearch] = useState("");
  const [uProducto, setUProducto] = useState<Productos>();
  const getList = async () => {
    setLoading(true);
    try {
      const { data, status } = await api.get("productos");
      if (status === 200 && data) {
        setList(data);
      } else {
        setAlertType("warning");
        setMessage("No se encontraron registros");
      }
    } catch (error) {
      console.error(error);
      setAlertType("error");
      setMessage("Ocurrió un error al cargar el listado de registros");
    } finally {
      setLoading(false);
    }
  };
  const getSearch = (): Productos[] => {
    if (search === "" || search.length === 0) {
      return list;
    } else {
      const reg = new RegExp(search, "i");
      return list.filter(
        (l) => reg.test(l.producto) || reg.test(l.categoria.categoria)
      );
    }
  };
  const result = getSearch();

  const setEdit = (producto: Productos) => {
    setUProducto(producto);
    setEditModal(true);
  };

  const setUpdate = (p: Productos) => {
    const index = list?.findIndex((c) => p.id === c.id);
    if (index !== -1) {
      setList((prev) => {
        const updateList = [...prev];
        updateList[index] = p;
        return updateList;
      });
    } else {
      setList((prev) => [...prev, p]);
    }
  };

  const destroy = async (producto: Productos) => {
    if (confirm(`¿Esta seguro de borrar: ${producto.producto}?`)) {
      try {
        const { status } = await api.delete(`productos/${producto.id}`);
        if (status === 200) {
          setList(list.filter((c) => c.id !== producto.id));
          setMessage("Se elimino el registro");
          setAlertType("success");
        }
      } catch (error) {
        console.error(error);
        setMessage("Ocurrió un error al borrar");
        setAlertType("success");
      }
    }
  };

  const showPrecios = (producto: Productos) => {
    setUProducto(producto);
    setPreciosModal(true);
  };

  const changeStatus = async (id: number): Promise<boolean | null> => {
    try {
      const { data, status } = await api.patch(`productos/estado/${id}`);
      if (status == 200 && data) {
        setMessage("Se cambio el estado con éxito");
        setAlertType("info");
        return data?.estado ?? null;
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  };
  useEffect(() => {
    getList();
  }, []);

  if (loading) return <Spinner />;

  return (
    <Layout title="Productos">
      <div className="w-full h-full bg-white  rounded-2xl p-6">
        <div className="flex text-lg mb-5 text-gray-700">
          Listado de productos
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {message && (
          <div className="mb-4">
            <Alert message={message} type={alertType} setMessage={setMessage} />
          </div>
        )}
        {list && list.length > 0 && (
          <div className="overflow-x-auto bg-white rounded-lg">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-slate-900">
                  <th className="px-4 py-2 text-left font-semibold text-slate-50 w-2/12">
                    Acciones
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-slate-50 w-1/12">
                    Estado
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-slate-50">
                    Producto
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-slate-50">
                    Categoria
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.map((m) => (
                  <tr className=" hover:bg-gray-50" key={m.id}>
                    <td className="px-4 py-2">
                      <button
                        className="text-slate-700 rounded-lg mx-1 px-2 py-2 bg-stone-100 hover:bg-slate-700 hover:text-white"
                        onClick={() => showPrecios(m)}
                        title="Configurar precios"
                      >
                        <DollarSign size={18} absoluteStrokeWidth />
                      </button>
                      <button
                        className="text-slate-700 rounded-lg mx-1 px-2 py-2 bg-stone-100 hover:bg-slate-700 hover:text-white"
                        onClick={() => setEdit(m)}
                        title="Editar"
                      >
                        <Pencil size={18} absoluteStrokeWidth />
                      </button>
                      <button
                        className="text-red-800 rounded-lg mx-1 px-2 py-2 bg-stone-100 hover:bg-red-800 hover:text-white"
                        onClick={() => destroy(m)}
                        title="Eliminar de forma permanente"
                      >
                        <TrashIcon size={18} absoluteStrokeWidth />
                      </button>
                    </td>
                    <td className="px-4 py-2">
                      <Switch
                        status={m.estado}
                        id={m.id}
                        changeStatus={changeStatus}
                      />
                    </td>
                    <td className="px-4 py-2">{m.producto}</td>
                    <td className="px-4 py-2">{m.categoria.categoria}</td>
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
        title="Agregar producto"
        size="md"
      >
        <ProductosForm setUpdate={setUpdate} />
      </Modal>
      {uProducto && (
        <Modal
          isOpen={editModal}
          setIsOpen={setEditModal}
          title={`Editar producto: ${uProducto?.producto}`}
          size="md"
        >
          <ProductosForm setUpdate={setUpdate} producto={uProducto} />
        </Modal>
      )}

      {uProducto && (
        <Modal
          isOpen={preciosModal}
          setIsOpen={setPreciosModal}
          title={`Configurar precios de: ${uProducto?.producto}`}
          size="lg"
        >
          <PreciosList id={uProducto.id} />
        </Modal>
      )}
    </Layout>
  );
}
