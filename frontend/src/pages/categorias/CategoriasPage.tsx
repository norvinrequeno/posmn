import { Plus } from "lucide-react";
import Layout from "../../components/Layout";
import Switch from "../../components/Switch";

export default function CategoriasPage() {
  return (
    <Layout title="Categorías">
      <div className="w-full h-full bg-white  rounded-2xl p-6">
        <div className="flex text-lg mb-5 text-gray-700">
          Listado de categorías
        </div>
        <div className="flex mb-4">
          <div className="w-2/12">
            <button className="flex gap-2 bg-amber-700 text-white px-4 py-2 rounded hover:bg-amber-900 transition ease-in-out duration-300 cursor-pointer">
              <Plus size={20} />
              Agregar
            </button>
          </div>
          <input
            type="text"
            className="p-2 border-gray-500 border rounded-xl focus:border-green-600 w-11/12"
            placeholder="Buscar..."
          />
        </div>

        <div className="overflow-x-auto bg-white rounded-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-slate-900">
                <th className="px-4 py-2 text-left font-semibold text-slate-50">
                  Acciones
                </th>
                <th className="px-4 py-2 text-left font-semibold text-slate-50">
                  Estado
                </th>
                <th className="px-4 py-2 text-left font-semibold text-slate-50">
                  Categorías
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className=" hover:bg-gray-50">
                <td className="px-4 py-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    Editar
                  </button>
                  <button className="text-red-600 hover:text-red-800 ml-2">
                    Eliminar
                  </button>
                </td>
                <td className="px-4 py-2">
                  <Switch />
                </td>
                <td className="px-4 py-2">Tecnología</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    Editar
                  </button>
                  <button className="text-red-600 hover:text-red-800 ml-2">
                    Eliminar
                  </button>
                </td>
                <td className="px-4 py-2">Inactivo</td>
                <td className="px-4 py-2">Salud</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    Editar
                  </button>
                  <button className="text-red-600 hover:text-red-800 ml-2">
                    Eliminar
                  </button>
                </td>
                <td className="px-4 py-2">Pendiente</td>
                <td className="px-4 py-2">Educación</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
