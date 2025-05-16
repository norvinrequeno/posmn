import { useParams } from "react-router-dom";
import api from "../../api";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { PagosVenta, Ventas, VentasDetalles } from "../../types";

export default function CompletaPage() {
  const { id } = useParams();
  const [venta, setVenta] = useState<Ventas | null>(null);
  const [detalle, setDetalle] = useState<VentasDetalles[]>([]);
  const [pagos, setPagos] = useState<PagosVenta[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getVenta = async () => {
    try {
      const { data, status } = await api.get(`ventas/ticket/${id}`);
      if (status === 200 && data && data.venta) {
        setVenta(data.venta);
        setDetalle(data.detalle);
        setPagos(data.pagos);
      } else {
        setError("No se encontró la venta");
      }
    } catch (err) {
      console.error(err);
      setError("Error al cargar la información de la venta");
    }
  };
  const sum = detalle.reduce((acc, p) => acc + p.total, 0);
  useEffect(() => {
    getVenta();
  }, [id]);

  if (error) {
    return (
      <Layout title="Resumen de venta">
        <div className="w-full max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow text-center text-red-600 font-semibold">
          {error}
        </div>
      </Layout>
    );
  }

  if (!venta) {
    return (
      <Layout title="Resumen de venta">
        <div className="w-full max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow text-center text-gray-500">
          Cargando información de la venta...
        </div>
      </Layout>
    );
  }

  const fecha = new Date(venta.fecha).toLocaleDateString("es-SV", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "America/El_Salvador",
  });

  const hora = new Date(venta.fecha).toLocaleTimeString("es-SV", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "America/El_Salvador",
  });

  return (
    <Layout title="Resumen de venta">
      <div className="flex flex-col bg-white w-full max-w-3xl mx-auto min-h-full rounded-2xl p-4 sm:p-6 shadow-md">
        {/* Encabezado de la venta */}
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            Resumen de Venta
          </h2>
          <p className="text-sm text-gray-600">
            Titular: <span className="font-medium">{venta.titular}</span>
          </p>
          <p className="text-sm text-gray-600">
            Fecha: <span className="font-medium">{fecha}</span> a las{" "}
            <span className="font-medium">{hora}</span>
          </p>
          <p className="text-sm text-gray-600">
            Total:{" "}
            <span className="font-semibold text-blue-600">
              ${sum.toFixed(2)}
            </span>
          </p>
        </div>

        {/* Pagos */}
        <div className="mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3">
            Pagos
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pagos.map((pago, index) => (
              <div
                key={index}
                className="p-4 border rounded-xl bg-blue-50 text-blue-800 shadow-sm"
              >
                <p className="font-semibold">{pago.forma.forma}</p>
                <p>${pago.monto.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Detalles de productos */}
        <div className="overflow-x-auto">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3">
            Detalle de Productos
          </h3>
          <table className="min-w-full table-auto text-left border-t text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-2">Producto</th>
                <th className="p-2">Cantidad</th>
                <th className="p-2">Precio</th>
                <th className="p-2">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {detalle.map((item, index) => (
                <tr key={index} className="border-t text-gray-600">
                  <td className="p-2">{item.concepto}</td>
                  <td className="p-2">{item.cantidad}</td>
                  <td className="p-2">${item.unitario.toFixed(2)}</td>
                  <td className="p-2">${item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
