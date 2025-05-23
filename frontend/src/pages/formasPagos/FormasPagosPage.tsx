import { Pencil, Plus, TrashIcon } from "lucide-react";
import Layout from "../../components/Layout";
import Switch from "../../components/Switch";
import { useEffect, useState } from "react";
import { AlertType, FormasPagos } from "../../types";
import api from "../../api";
import Spinner from "../../components/Spinner";
import Alert from "../../components/Alert";
import Modal from "../../components/Modal";
import FormasPagosForm from "./FormasPagosForm";

export default function FormasPagosPage() {
  const [list, setList] = useState<FormasPagos[]>([]);
  const [uFormaPago, setUFormaPago] = useState<FormasPagos>();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState<AlertType>("info");
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [search, setSearch] = useState("");
  const getList = async () => {
    try {
      setLoading(true);
      const { data, status } = await api.get("formas_pagos");
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
  const setUpdate = (formaPago: FormasPagos) => {
    const index = list?.findIndex((c) => formaPago.id === c.id);
    if (index !== -1) {
      setList((prev) => {
        const updateList = [...prev];
        updateList[index] = formaPago;
        return updateList;
      });
    } else {
      setList((prev) => [...prev, formaPago]);
    }
  };

  const setEdit = (formaPago: FormasPagos) => {
    setUFormaPago(formaPago);
    setEditModal(true);
  };

  const destroy = async (formaPago: FormasPagos) => {
    if (confirm(`¿Esta seguro de borrar el registro: ${formaPago.forma}?`)) {
      try {
        const { status } = await api.delete(`formas_pagos/${formaPago.id}`);
        if (status === 200) {
          setList(list.filter((c) => c.id !== formaPago.id));
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

  const changeStatus = async (id: number): Promise<boolean | null> => {
    try {
      const { data, status } = await api.patch(`formas_pagos/estado/${id}`);
      if (status == 200 && data) {
        setMessage("Se cambio el estado con éxito");
        setTypeAlert("info");
        return data?.estado ?? null;
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  };
  const getSearch = (): FormasPagos[] => {
    if (search === "" || search.length === 0) {
      return list;
    } else {
      const reg = new RegExp(search, "i");
      return list.filter((l) => reg.test(l.forma));
    }
  };

  const result = getSearch();
  useEffect(() => {
    getList();
  }, []);
  if (loading) return <Spinner />;
  return (
    <Layout title="Formas de pagos">
      <div className="w-full h-full bg-white  rounded-2xl p-6">
        <div className="flex text-lg mb-5 text-gray-700">
          Listado de formas de pago
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
                  <th className="px-4 py-2 text-left font-semibold text-slate-50 w-2/12">
                    Acciones
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-slate-50 w-1/12">
                    Estado
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-slate-50">
                    Forma
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.map((m) => (
                  <tr className=" hover:bg-gray-50" key={m.id}>
                    <td className="px-4 py-2">
                      <button
                        className="text-slate-700 rounded-lg mx-1 px-2 py-2 bg-stone-100 hover:bg-slate-700 hover:text-white"
                        onClick={() => setEdit(m)}
                      >
                        <Pencil size={18} absoluteStrokeWidth />
                      </button>
                      <button
                        className="text-red-800 rounded-lg mx-1 px-2 py-2 bg-stone-100 hover:bg-red-800 hover:text-white"
                        onClick={() => destroy(m)}
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
                    <td className="px-4 py-2">{m.forma}</td>
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
        title="Agregar una forma de pago"
        size="md"
      >
        <FormasPagosForm setUpdate={setUpdate} />
      </Modal>
      <Modal
        isOpen={editModal}
        setIsOpen={setEditModal}
        title={`Editar forma de pago: ${uFormaPago?.forma}`}
        size="md"
      >
        <FormasPagosForm setUpdate={setUpdate} formaPago={uFormaPago} />
      </Modal>
    </Layout>
  );
}
