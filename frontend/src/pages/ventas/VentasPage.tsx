import { useState } from "react";
import Layout from "../../components/Layout";
import Car from "./Car";
import { ShoppingCart } from "lucide-react";
import ProductosList from "./ProductosList";

export default function VentasPage() {
  const [showCar, setShowCar] = useState(true);

  return (
    <Layout title="Ventas">
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
          <ProductosList />
        </div>
        <div
          className={`${
            showCar ? "w-3/12" : "hidden"
          } rounded-2xl min-h-full bg-white p-6  overflow-y-auto transition-all duration-300 ease-in-out`}
        >
          <Car />
        </div>
      </div>
    </Layout>
  );
}
