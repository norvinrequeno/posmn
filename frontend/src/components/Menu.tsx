import useAuth from "../auth/useAuth";
import { LinkMenuType } from "../types";
import { ChevronLeft, LogOut, MenuIcon, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { MenuItems } from "../routes";

import Modal from "./Modal";
import NuevaVentaForm from "../pages/ventas/NuevaVentaForm";

export default function Menu() {
  const { name, logout, menu, changeMenu, ventaModal, changeVentaModal } =
    useAuth();

  const links: LinkMenuType[] = [
    ...MenuItems,
    {
      name: "Cerrar sesión",
      click: logout,
      icon: <LogOut size={20} />,
      sm: true,
    },
  ];
  return (
    <>
      <aside
        className={`${
          menu ? "lg:w-64 w-16 block" : "hidden lg:block lg:w-16"
        } bg-white transition-all duration-300 ease-in-out flex-shrink-0`}
      >
        <div className="h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between p-4">
              <span className="hidden lg:block font-bold text-lg text-gray-700 uppercase">
                {menu && name}
              </span>
              <button onClick={() => changeMenu()}>
                {menu ? <ChevronLeft /> : <MenuIcon />}
              </button>
            </div>

            <nav className="space-y-1 mt-2">
              <button
                onClick={() => changeVentaModal()}
                className="lg:flex hidden items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-amber-900 hover:text-white rounded w-full text-left"
              >
                <span>
                  <Plus />
                </span>
                {menu && <span className="hidden lg:flex">Nueva venta</span>}
              </button>
              {links.map((link: LinkMenuType, index) => {
                if (link.to) {
                  return (
                    <Link
                      key={index}
                      to={link.to}
                      className={`${
                        link.sm ? "flex" : "hidden lg:flex"
                      } items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-amber-900 hover:text-white rounded`}
                    >
                      <span>{link.icon}</span>
                      {menu && (
                        <span className="hidden lg:flex">{link.name}</span>
                      )}
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
                      {menu && (
                        <span className="hidden lg:flex">{link.name}</span>
                      )}
                    </button>
                  );
                }

                return null;
              })}
            </nav>
          </div>
        </div>
      </aside>
      <Modal
        setIsOpen={changeVentaModal}
        isOpen={ventaModal}
        title="Nueva venta"
      >
        <NuevaVentaForm />
      </Modal>
    </>
  );
}
