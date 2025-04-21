import { Maximize2, Minimize2, ShoppingCart } from "lucide-react";
import Layout from "../../components/Layout";
import Alert from "../../components/Alert";
import ProductosList from "./ProductosList";
import Car from "./Car";
import useVenta from "./service/useVenta";
import Spinner from "../../components/Spinner";
import { useState } from "react";

export default function VentasApp() {
  const {
    venta,
    message,
    typeAlert,
    error,
    loading,
    setMessage,
    showCar,
    changeShowCar,
  } = useVenta();
  const [showList, setShowList] = useState(true);
  if (loading) return <Spinner />;

  if (error) {
    return (
      <Layout title="Error">
        <Alert message={message} type={typeAlert} setMessage={setMessage} />
      </Layout>
    );
  }
  return (
    <Layout title={`Venta N°${venta?.id} - ${venta?.titular ?? "cliente"}`}>
      <div className="flex flex-col md:flex-row w-full min-h-full gap-6">
        <div
          className={`${
            showCar ? "w-full md:w-9/12" : "w-full"
          } bg-white rounded-2xl p-6 transition-all duration-300`}
        >
          <div className="flex justify-between mb-5">
            <div className="text-xl">Productos</div>
            <button
              type="button"
              onClick={changeShowCar}
              className="hidden md:block"
            >
              <ShoppingCart />
            </button>
            <button
              type="button"
              onClick={() => setShowList(!showList)}
              className="block md:hidden"
            >
              {showList ? <Minimize2 /> : <Maximize2 />}
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
          {showList && <ProductosList />}
        </div>
        <div
          className={`${
            showCar ? "w-full md:w-3/12" : "hidden"
          } rounded-2xl min-h-full bg-white p-6  overflow-y-auto transition-all duration-300 ease-in-out`}
        >
          <Car />
        </div>
      </div>
    </Layout>
  );
}
