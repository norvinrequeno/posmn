import { useEffect, useState } from "react";
import { Precios } from "../../types";
import api from "../../api";
import Spinner from "../../components/Spinner";
import { Trash } from "lucide-react";
import Switch from "../../components/Switch";
import PreciosAddForm from "./PreciosAddForm";

export default function PreciosList({ id }: { id: number }) {
  const [list, setList] = useState<Precios[]>([]);
  const [loading, setLoading] = useState(true);
  const getList = async () => {
    setLoading(true);
    try {
      const { data, status } = await api.get(`precios/productos/${id}`);
      if (status === 200 && data) {
        setList(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const changeStatus = async (id: number): Promise<boolean | null> => {
    try {
      const { data, status } = await api.patch(`precios/estado/${id}`);
      if (status == 200 && data) {
        setList((prev) =>
          prev.map((item) =>
            item.id === data.id ? { ...item, estado: data.estado } : item
          )
        );
        return data?.estado ?? null;
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  };
  const updateList = (precio: Precios) => {
    setList([...list, precio]);
  };

  const destroy = async (precio: Precios) => {
    if (
      confirm(
        `Seguro de borrar el precio: $${precio.precio} - ${
          precio.detalle ?? "--Sin detalle--"
        }`
      )
    ) {
      try {
        const { status } = await api.delete(`precios/${precio.id}`);
        if (status === 200) {
          setList((p) => p.filter((n) => n.id !== precio.id));
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    getList();
  }, [id]);

  if (loading) return <Spinner />;

  return (
    <>
      <PreciosAddForm producto_id={id} updateList={updateList} />

      <div className="grid gap-4 grid-cols-1">
        {list &&
          list.map((precio) => (
            <div
              key={precio.id}
              className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 border border-gray-100"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">
                    ${precio.precio.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500 italic">
                    {precio.detalle || "--Sin detalle--"}
                  </p>
                  <div className="flex">
                    <Switch
                      name="preciosList"
                      status={precio.estado}
                      id={precio.id}
                      changeStatus={changeStatus}
                    />
                    <span
                      className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${
                        precio.estado
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {precio.estado ? "Activo" : "Inactivo"}{" "}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <button
                    type="button"
                    className="text-red-700 py-2 px-2 rounded-lg hover:bg-red-700 hover:text-white"
                    onClick={() => destroy(precio)}
                  >
                    <Trash size={24} absoluteStrokeWidth={true} />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
