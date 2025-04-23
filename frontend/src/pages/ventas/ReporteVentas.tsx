import { useState } from "react";
import Layout from "../../components/Layout";
import api from "../../api";

type FormaPago = {
  id: number;
  forma: string;
};

type Pago = {
  id: number;
  monto: number;
  forma: FormaPago;
};

type Venta = {
  id: number;
  fecha: string;
  titular: string;
  estado: boolean;
  facturada: boolean;
  completa: boolean;
  pagos: Pago[];
};

export default function ReporteVentas() {
  const [inicio, setInicio] = useState("");
  const [fin, setFin] = useState("");
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [formas, setFormas] = useState<FormaPago[]>([]);
  const [loading, setLoading] = useState(false);

  const generarReporte = async () => {
    setLoading(true);
    try {
      const { data } = await api.post("ventas/reporte", { inicio, fin });
      setVentas(data.ventas);
      setFormas(data.formas);
    } catch (error) {
      console.error("Error al generar reporte", error);
    } finally {
      setLoading(false);
    }
  };

  const totales: Record<number, number> = {};
  formas.forEach((forma) => {
    totales[forma.id] = ventas.reduce((suma, venta) => {
      const pago = venta.pagos.find((p) => p.forma.id === forma.id);
      return suma + (pago?.monto || 0);
    }, 0);
  });

  return (
    <Layout title="Reporte de ventas">
      <div className="p-4 space-y-6 bg-white rounded-2xl min-h-full">
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
                  <th className="px-4 py-2 border text-left">Fecha</th>
                  <th className="px-4 py-2 border text-left">Titular</th>
                  {formas.map((forma) => (
                    <th key={forma.id} className="px-4 py-2 border text-left">
                      {forma.forma}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ventas.map((venta) => (
                  <tr key={venta.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">
                      {new Date(venta.fecha).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 border">{venta.titular}</td>
                    {formas.map((forma) => {
                      const pago = venta.pagos.find(
                        (p) => p.forma.id === forma.id
                      );
                      return (
                        <td
                          key={forma.id}
                          className="px-4 py-2 border text-right"
                        >
                          {pago ? `$${pago.monto.toFixed(2)}` : "$0.00"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 font-semibold">
                  <td className="px-4 py-2 border text-right" colSpan={2}>
                    Totales:
                  </td>
                  {formas.map((forma) => (
                    <td key={forma.id} className="px-4 py-2 border text-right">
                      ${totales[forma.id].toFixed(2)}
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}
