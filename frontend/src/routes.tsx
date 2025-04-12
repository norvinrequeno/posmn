import { LinkMenuType, RoutesItem } from "./types";
import CategoriasPage from "./pages/categorias/CategoriasPage";
import DashboardPage from "./pages/DashboardPage";
import {
  CalendarHeart,
  LayoutDashboard,
  Package,
  Plus,
  ShoppingCart,
} from "lucide-react";
import ProductosPage from "./pages/productos/ProductosPage";
import VentasPage from "./pages/ventas/VentasPage";
//cSpell:ignore categorias
export const routesApp: RoutesItem[] = [
  {
    label: "Sin Autorización",
    path: "/unauthorize",
    element: <>No tienes autorización</>,
    guard: false,
    menu: false,
  },
  {
    label: "Dashboard",
    path: "/dashboard",
    element: <DashboardPage />,
    icon: <LayoutDashboard size={20} />,
    guard: true,
    menu: true,
  },
  {
    label: "Categorias",
    path: "/categorias",
    element: <CategoriasPage />,
    icon: <CalendarHeart size={20} />,
    guard: true,
    menu: true,
  },
  {
    label: "Productos",
    path: "/productos",
    element: <ProductosPage />,
    icon: <Package size={20} />,
    guard: true,
    menu: true,
  },
  {
    label: "Ventas",
    path: "/ventas",
    element: <VentasPage />,
    icon: <ShoppingCart size={20} />,
    guard: true,
    menu: true,
  },
];

export const MenuItems: LinkMenuType[] = routesApp
  .filter((r) => r.menu)
  .map(({ label, icon, path }) => ({
    name: label,
    icon: icon ?? <Plus size={20} />,
    to: path,
  }));
