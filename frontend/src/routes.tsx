import { LinkMenuType, RoutesItem } from "./types";
import CategoriasPage from "./pages/categorias/CategoriasPage";
import DashboardPage from "./pages/DashboardPage";
import {
  Banknote,
  CalendarHeart,
  ChartColumnBig,
  ChartColumnIncreasing,
  LayoutDashboard,
  Package,
  Plus,
  ShoppingCart,
} from "lucide-react";
import ProductosPage from "./pages/productos/ProductosPage";
import VentasPage from "./pages/ventas/VentasPage";
import VentasList from "./pages/ventas/VentasList";
import FormasPagosPage from "./pages/formasPagos/FormasPagosPage";
import CompletaPage from "./pages/ventas/CompletaPage";
import ReporteVentas from "./pages/ventas/ReporteVentas";
import ReporteProductos from "./pages/ventas/ReporteProductos";
import { ReactElement } from "react";
//cSpell:ignore categorias
interface RouteOptions {
  label: string;
  path: string;
  element: ReactElement;
  icon?: ReactElement;
  guard?: boolean;
  menu?: boolean;
  sm?: boolean;
}
function createRoute({
  guard = true,
  menu = true,
  sm = false,
  ...rest
}: RouteOptions): RoutesItem {
  return {
    guard,
    menu,
    sm,
    ...rest,
  };
}
export const routesApp: RoutesItem[] = [
  createRoute({
    label: "Sin Autorización",
    path: "/unauthorize",
    element: <>No tienes autorización</>,
    guard: false,
    menu: false,
  }),
  createRoute({
    label: "Dashboard",
    path: "/dashboard",
    element: <DashboardPage />,
    icon: <LayoutDashboard size={20} />,
  }),
  createRoute({
    label: "Categorias",
    path: "/categorias",
    element: <CategoriasPage />,
    icon: <CalendarHeart size={20} />,
  }),
  createRoute({
    label: "Formas de pagos",
    path: "/formas_pagos",
    element: <FormasPagosPage />,
    icon: <Banknote size={20} />,
  }),
  createRoute({
    label: "Productos",
    path: "/productos",
    element: <ProductosPage />,
    icon: <Package size={20} />,
  }),
  createRoute({
    label: "Ventas detalle",
    path: "/ventas/:id",
    element: <VentasPage />,
    icon: <ShoppingCart size={20} />,
    menu: false,
  }),
  createRoute({
    label: "Ventas ticket",
    path: "/ventas/ticket/:id",
    element: <CompletaPage />,
    icon: <ShoppingCart size={20} />,
    menu: false,
  }),
  createRoute({
    label: "Ventas",
    path: "/ventas",
    element: <VentasList />,
    icon: <ShoppingCart size={20} />,
    sm: true,
  }),
  createRoute({
    label: "Reporte de ventas",
    path: "/ventas/reporte",
    element: <ReporteVentas />,
    icon: <ChartColumnIncreasing size={20} />,
  }),
  createRoute({
    label: "Reporte de productos",
    path: "/ventas/productos/reporte",
    element: <ReporteProductos />,
    icon: <ChartColumnBig size={20} />,
  }),
];

export const MenuItems: LinkMenuType[] = routesApp
  .filter((r) => r.menu)
  .map(({ label, icon, path, sm }) => ({
    name: label,
    icon: icon ?? <Plus size={20} />,
    to: path,
    sm: sm,
  }));
