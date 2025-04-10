import { JSX } from "react";
//cSpell:ignore categorias categoria
export type LinkMenuType = {
  to?: string;
  click?: () => void;
  name: string;
  icon: JSX.Element;
};

export interface RoutesItem {
  label: string;
  path: string;
  element: JSX.Element;
  icon?: JSX.Element;
  guard: boolean;
  menu: boolean;
}

export type AlertType = "success" | "error" | "warning" | "info";
export type Categorias = {
  id: number;
  categoria: string;
  estado: boolean;
};

export type Productos = {
  id: number;
  producto: string;
  detalle: string;
  estado: boolean;
  categoria: Categorias;
};
