import { ChevronDown, X } from "lucide-react";
import { useState } from "react";
import AddItem from "./AddItem";
//cSpell:ignore categorias categoria
export default function ProductosList() {
  const [showCat, setShowCat] = useState(false);
  const [selectedCats, setSelectedCats] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const categorias = [
    { id: 1, categoria: "Atoles" },
    { id: 2, categoria: "Tacos" },
    { id: 3, categoria: "Harinas" },
  ];

  const productos = [
    {
      id: 1,
      cantidad: 1,
      producto: "Atol de semilla de marañón",
      precio: 0.85,
      categoria: 1,
    },
    {
      id: 2,
      cantidad: 1,
      producto: "Harina para horchata",
      precio: 6.0,
      categoria: 3,
    },
    {
      id: 4,
      cantidad: 1,
      producto: "Taco unidad",
      precio: 1.2,
      categoria: 2,
    },
    {
      id: 5,
      cantidad: 1,
      producto: "Orden de tacos (3 unit.)",
      precio: 2.5,
      categoria: 2,
    },
  ];
  const pFilter = () => {
    let filterProducto = productos;
    if (selectedCats && selectedCats.length > 0)
      filterProducto = filterProducto.filter((p) =>
        selectedCats.includes(p.categoria)
      );

    if (search !== "") {
      const reg = new RegExp(search, "i");
      filterProducto = filterProducto.filter((p) => reg.test(p.producto));
    }
    return filterProducto;
  };
  const productosFilter = pFilter();
  const toggleCats = (id: number) => {
    setSelectedCats((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };
  return (
    <div className="flex flex-col">
      <div className="w-full flex gap-3 mb-5">
        <div className="relative inline-block">
          <button
            className="px-3 py-2 bg-slate-200 rounded-lg flex gap-1 items-center hover:bg-slate-300"
            onClick={() => setShowCat(!showCat)}
          >
            Categorías <ChevronDown size={20} />
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

        {categorias
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
        {productosFilter.map((p) => (
          <AddItem item={p} />
        ))}
      </div>
    </div>
  );
}
