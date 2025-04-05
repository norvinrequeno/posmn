import React, { useState } from "react";
import useAuth from "../auth/useAuth";
import { Link } from "react-router-dom";
import { ChevronLeft, LayoutDashboard, LogOut, Menu } from "lucide-react";
import { LinkMenuType } from "../types";

export default function Layout({
  title = "POS",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  const { name, logout } = useAuth();

  const links: LinkMenuType[] = [
    {
      name: "Dashboard",
      to: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Cerrar sesión",
      click: logout,
      icon: <LogOut size={20} />,
    },
  ];
  return (
    <div className="flex h-screen bg-white">
      <aside
        className={`${
          open ? "w-64" : "w-16"
        } bg-white  transition-all duration-300 ease-in-out flex-shrink-0`}
      >
        <div className="h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between p-4">
              <span className="font-bold text-lg text-gray-700 uppercase">
                {open && name}
              </span>
              <button onClick={() => setOpen(!open)}>
                {open ? <ChevronLeft /> : <Menu />}
              </button>
            </div>

            <nav className="space-y-1 mt-2">
              {links.map((link: LinkMenuType, index) => {
                if (link.to) {
                  return (
                    <Link
                      key={index}
                      to={link.to}
                      className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-amber-900 hover:text-white rounded"
                    >
                      <span>{link.icon}</span>
                      {open && <span>{link.name}</span>}
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
                      {open && <span>{link.name}</span>}
                    </button>
                  );
                }

                return null;
              })}
            </nav>
          </div>
        </div>
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white px-4 py-3 flex items-center justify-between">
          <div className="text-xl font-semibold text-gray-800">{title}</div>
        </header>
        <main className="flex-1 overflow-y-auto p-10 min-h-95 bg-gray-100 rounded-4xl">
          {children}
        </main>
      </div>
    </div>
  );
}
