import useAuth from "../auth/useAuth";
import { LinkMenuType } from "../types";
import { ChevronLeft, LogOut, MenuIcon, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { MenuItems } from "../routes";
import { useState } from "react";
import Modal from "./Modal";
import NuevaVentaForm from "../pages/ventas/NuevaVentaForm";

export default function Menu() {
  const { name, logout, menu, changeMenu } = useAuth();
  const [ventaModal, setVentaModal] = useState(false);
  const links: LinkMenuType[] = [
    ...MenuItems,
    {
      name: "Cerrar sesión",
      click: logout,
      icon: <LogOut size={20} />,
    },
  ];
  return (
    <aside
      className={`${
        menu ? "sm:w-16 lg:w-64" : "w-16"
      } bg-white  transition-all duration-300 ease-in-out flex-shrink-0`}
    >
      <div className="h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between p-4">
            <span className="font-bold text-lg text-gray-700 uppercase">
              {menu && name}
            </span>
            <button onClick={() => changeMenu()}>
              {menu ? <ChevronLeft /> : <MenuIcon />}
            </button>
          </div>

          <nav className="space-y-1 mt-2">
            <button
              onClick={() => setVentaModal(!ventaModal)}
              className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-amber-900 hover:text-white rounded w-full text-left"
            >
              <span>
                <Plus />
              </span>
              {menu && <span>Nueva venta</span>}
            </button>
            {links.map((link: LinkMenuType, index) => {
              if (link.to) {
                return (
                  <Link
                    key={index}
                    to={link.to}
                    className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-amber-900 hover:text-white rounded"
                  >
                    <span>{link.icon}</span>
                    {menu && <span>{link.name}</span>}
                  </Link>
                );
              }

              if (link.click) {
                return (
                  <button
                    key={index}
                    onClick={link.click}
                    className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-amber-900 hover:text-white rounded w-full text-left"
                  >
                    <span>{link.icon}</span>
                    {menu && <span>{link.name}</span>}
                  </button>
                );
              }

              return null;
            })}
          </nav>
        </div>
      </div>
      <Modal setIsOpen={setVentaModal} isOpen={ventaModal}>
        <NuevaVentaForm />
      </Modal>
    </aside>
  );
}
