import { ChevronDown, ChevronUp, X } from "lucide-react";
import { useEffect, useState } from "react";
import AddItem from "./AddItem";
import Spinner from "../../components/Spinner";
import api from "../../api";
import { Categorias, Precios } from "../../types";
//cSpell:ignore categorias categoria
export default function ProductosList() {
  const [showCat, setShowCat] = useState(false);
  const [selectedCats, setSelectedCats] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [categorias, setCategorias] = useState<Categorias[]>([]);
  const [precios, setPrecios] = useState<Precios[]>([]);

  const pFilter = () => {
    let filterProducto = precios;
    if (selectedCats && selectedCats.length > 0)
      filterProducto = filterProducto.filter((p) =>
        selectedCats.includes(p.producto.categoria.id)
      );

    if (search !== "") {
      const reg = new RegExp(search, "i");
      filterProducto = filterProducto.filter((p) =>
        reg.test(p.producto.producto)
      );
    }
    return filterProducto ?? [];
  };
  const productosFilter = pFilter();
  const toggleCats = (id: number) => {
    setSelectedCats((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const getProductos = async () => {
    try {
      const { data, status } = await api.get("precios/get/productos");
      if (status === 200 && data) {
        setCategorias(data.categorias);
        setPrecios(data.precios);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProductos();
  }, []);
  if (loading) return <Spinner />;
  return (
    <div className="flex flex-col">
      <div className="w-full flex flex-wrap gap-3 mb-5">
        <div className="relative">
          <button
            className="px-3 py-2 bg-slate-200 rounded-lg flex gap-1 items-center hover:bg-slate-300"
            onClick={() => setShowCat(!showCat)}
          >
            Categorías
            {showCat ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {showCat && (
            <div className="absolute w-60 z-index-40 mt-2 bg-neutral-100 rounded-lg shadow-lg transition duration-300">
              {categorias &&
                categorias.map((c) => (
                  <label
                    className={`flex gap-2 py-2 px-4 hover:bg-slate-200 rounded-lg ${
                      selectedCats.includes(c.id) && "bg-slate-200"
                    }`}
                    key={c.id}
                  >
                    <input
                      type="checkbox"
                      value={c.id}
                      checked={selectedCats.includes(c.id)}
                      onChange={() => toggleCats(c.id)}
                    />
                    <span>{c.categoria}</span>
                  </label>
                ))}
            </div>
          )}
        </div>
        {categorias.length > 0 &&
          categorias
            .filter((c) => selectedCats.includes(c.id))
            .map((c) => (
              <div
                key={c.id}
                className="text-sm text-gray-700 px-3 py-2 bg-slate-100 rounded-lg flex gap-1 items-center hover:bg-slate-200"
              >
                {c.categoria}{" "}
                <X
                  size={18}
                  onClick={() => toggleCats(c.id)}
                  className="cursor-pointer"
                />
              </div>
            ))}
      </div>
      <div className="w-full mb-4">
        <input
          type="text"
          className="w-full bg-white border border-gray-300 rounded-xl py-2 px-4"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="w-full">
        {productosFilter.length > 0 &&
          productosFilter.map((p) => <AddItem item={p} key={p.id} />)}
      </div>
    </div>
  );
}
