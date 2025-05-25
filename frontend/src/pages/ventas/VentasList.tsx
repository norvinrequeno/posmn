import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Ventas } from "../../types";
import api from "../../api";
import Spinner from "../../components/Spinner";
import VentaTicket from "./VentaTicket";

export default function VentasList() {
  const [list, setList] = useState<Ventas[]>([]);
  const [loading, setLoading] = useState(true);
  const getList = async () => {
    setLoading(true);
    try {
      const { data, status } = await api.get("ventas/active");
      if (status === 200 && data) {
        setList(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getList();
  }, []);
  if (loading) return <Spinner />;
  return (
    <Layout title="Listado de ventas">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 p-4 lg:gap-6 lg:p-6 rounded-2xl min-h-full">
        {list && list.map((v) => <VentaTicket venta={v} key={v.id} />)}
      </div>
    </Layout>
  );
}
