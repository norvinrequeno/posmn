import { useState } from "react";
import Layout from "../../components/Layout";
import api from "../../api";

type Venta = {
  fecha: string;
  concepto: string;
  cantidad: number;
  unitario: number;
  total: number;
};

export default function ReporteProductos() {
  const [inicio, setInicio] = useState("");
  const [fin, setFin] = useState("");
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [loading, setLoading] = useState(false);

  const generarReporte = async () => {
    setLoading(true);
    try {
      const { data } = await api.post("ventas/reporte/productos", {
        inicio,
        fin,
      });
      setVentas(data.ventas);
    } catch (error) {
      console.error("Error al generar reporte", error);
    } finally {
      setLoading(false);
    }
  };
  const getTotal = ventas.reduce((sum, e) => sum + e.total, 0);

  return (
    <Layout title="Reporte de ventas">
      <div className="p-6 space-y-6 bg-white rounded-2xl min-h-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-medium">Fecha de inicio</label>
            <input
              type="date"
              value={inicio}
              onChange={(e) => setInicio(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Fecha final (opcional)
            </label>
            <input
              type="date"
              value={fin}
              onChange={(e) => setFin(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={generarReporte}
              disabled={loading || !inicio}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Generando..." : "Generar Reporte"}
            </button>
          </div>
        </div>

        {ventas.length === 0 ? (
          <p className="text-gray-500">No hay resultados para mostrar.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border rounded-lg overflow-hidden shadow">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="px-4 py-2 border text-left">Cantidad</th>
                  <th className="px-4 py-2 border text-left">Concepto</th>
                  <th className="px-4 py-2 border text-left">Unitario</th>
                  <th className="px-4 py-2 border text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(
                  ventas.reduce((acc, venta) => {
                    if (!acc[venta.fecha]) acc[venta.fecha] = [];
                    acc[venta.fecha].push(venta);
                    return acc;
                  }, {} as Record<string, Venta[]>)
                ).map(([fecha, ventasPorFecha]) => (
                  <>
                    <tr
                      key={fecha}
                      className="bg-gray-200 text-gray-800 font-semibold"
                    >
                      <td colSpan={4} className="px-4 py-2 border">
                        Ventas del {new Date(fecha).toLocaleDateString()}
                      </td>
                    </tr>
                    {ventasPorFecha.map((venta, index) => (
                      <tr
                        key={`${fecha}-${index}`}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-4 py-2 border">{venta.cantidad}</td>
                        <td className="px-4 py-2 border">{venta.concepto}</td>
                        <td className="px-4 py-2 border">
                          ${venta.unitario.toFixed(2)}
                        </td>
                        <td className="px-4 py-2 border">
                          ${venta.total.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 font-semibold">
                  <td className="px-4 py-2 border text-right" colSpan={3}>
                    Totales:
                  </td>
                  <td className="px-4 py-2 border">${getTotal.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}
