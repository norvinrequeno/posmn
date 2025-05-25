import { MenuIcon, Plus } from "lucide-react";
import useAuth from "../auth/useAuth";
import Menu from "./Menu";

export default function Layout({
  title = "POS",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  const { menu, changeMenu, changeVentaModal } = useAuth();
  return (
    <div className="flex h-screen bg-white">
      <Menu />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <div className="lg:hidden me-3">
              <button onClick={() => changeMenu()}>
                {menu ? "" : <MenuIcon />}
              </button>
            </div>
            <div className="text-xl font-semibold text-gray-800">{title}</div>
          </div>

          <button
            onClick={() => changeVentaModal()}
            className="flex lg:hidden items-center space-x-2 px-4 py-2 text-gray-700 text-left"
          >
            <Plus />
            <span>Venta</span>
          </button>
        </header>
        <main
          className={`flex-1 overflow-y-auto p-4 lg:p-7 min-h-95 bg-gray-200 rounded-4xl`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
