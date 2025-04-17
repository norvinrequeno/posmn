import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Car from "./Car";
import { ShoppingCart } from "lucide-react";
import ProductosList from "./ProductosList";
import { AlertType, Ventas, VentasDetalles } from "../../types";
import api from "../../api";
import { useParams } from "react-router-dom";
import Alert from "../../components/Alert";
import Spinner from "../../components/Spinner";

export default function VentasPage() {
  const { id } = useParams();
  const [venta, setVenta] = useState<Ventas>();
  const [showCar, setShowCar] = useState(true);
  const [message, setMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState<AlertType>("info");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [carList, setCarList] = useState<VentasDetalles[]>([]);
  const getVenta = async () => {
    setLoading(true);
    try {
      const { data, status } = await api.get(`ventas/${id}`);
      if (status === 200 && data) {
        setVenta(data.venta);
        setCarList(data.detalle);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addProducto = async (cantidad: number, precio_id: number) => {
    try {
      const { data, status } = await api.post("ventas_detalles", {
        cantidad,
        precio_id,
        ventas_id: venta?.id,
      });
      if (status === 201 && data) {
        setMessage("Se agrego correctamente");
        setTypeAlert("success");
        setCarList([...carList, data]);
        hideMessage();
      } else {
        setMessage(
          "Ocurrió un problema al agregar, verifique si su sesión esta activa. Actualice la pagina e intente de nuevo"
        );
        setTypeAlert("success");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const removeProducto = async (id: number) => {
    try {
      const { status } = await api.delete(`ventas_detalles/${id}`);
      if (status === 200) {
        setMessage("Se elimino correctamente");
        setTypeAlert("success");
        hideMessage();
        setCarList((prev) => prev.filter((d) => d.id !== id));
      } else {
        setMessage(
          "Ocurrió un problema al eliminar, verifique si su sesión esta activa. Actualice la pagina e intente de nuevo"
        );
        setTypeAlert("success");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const hideMessage = () => {
    setTimeout(() => setMessage(""), 4000);
  };

  useEffect(() => {
    getVenta();
  }, [id]);

  useEffect(() => {
    if (!venta) {
      setError(true);
      setMessage("No se encontró la venta que busca");
      setTypeAlert("error");
    } else if (venta && !venta.estado && !venta.facturada) {
      setError(true);
      setMessage("Esta venta ya no esta activa");
      setTypeAlert("warning");
    } else if (venta && venta.facturada) {
      setError(true);
      setMessage("Esta venta ya fue facturada");
      setTypeAlert("success");
    } else {
      setMessage("");
      setError(false);
    }
  }, [venta]);
  if (loading) return <Spinner />;

  if (error)
    return (
      <Layout title="Error">
        <Alert message={message} type={typeAlert} setMessage={setMessage} />
      </Layout>
    );

  return (
    <Layout title={`Venta N°${venta?.id} - ${venta?.titular ?? "cliente"}`}>
      <div className="flex w-full min-h-full gap-6">
        <div
          className={`${
            showCar ? "w-9/12" : "w-full"
          } bg-white rounded-2xl p-6 transition-all duration-300`}
        >
          <div className="flex justify-between mb-5">
            <div className="text-xl">Productos</div>
            <button type="button" onClick={() => setShowCar(!showCar)}>
              <ShoppingCart />
            </button>
          </div>
          {message && (
            <div className="fixed top-4 right-4 z-50">
              <Alert
                message={message}
                type={typeAlert}
                setMessage={setMessage}
              />
            </div>
          )}
          <ProductosList addProducto={addProducto} />
        </div>
        <div
          className={`${
            showCar ? "w-3/12" : "hidden"
          } rounded-2xl min-h-full bg-white p-6  overflow-y-auto transition-all duration-300 ease-in-out`}
        >
          <Car list={carList} removeProducto={removeProducto} />
        </div>
      </div>
    </Layout>
  );
}
