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
    label: "Formas de pagos",
    path: "/formas_pagos",
    element: <FormasPagosPage />,
    icon: <Banknote size={20} />,
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
    label: "Ventas detalle",
    path: "/ventas/:id",
    element: <VentasPage />,
    icon: <ShoppingCart size={20} />,
    guard: true,
    menu: false,
  },
  {
    label: "Ventas ticket",
    path: "/ventas/ticket/:id",
    element: <CompletaPage />,
    icon: <ShoppingCart size={20} />,
    guard: true,
    menu: false,
  },
  {
    label: "Ventas",
    path: "/ventas",
    element: <VentasList />,
    icon: <ShoppingCart size={20} />,
    guard: true,
    menu: true,
  },
  {
    label: "Reporte de ventas",
    path: "/ventas/reporte",
    element: <ReporteVentas />,
    icon: <ChartColumnIncreasing size={20} />,
    guard: true,
    menu: true,
  },
  {
    label: "Reporte de ventas por productos",
    path: "/ventas/productos/reporte",
    element: <ReporteProductos />,
    icon: <ChartColumnBig size={20} />,
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
