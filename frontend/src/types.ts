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

export type Precios = {
  id: number;
  precio: number;
  detalle: string;
  estado: boolean;
  producto: Productos;
};
export type User = {
  name: string;
  id: number;
  email: number;
};
export type Ventas = {
  id: number;
  fecha: Date;
  titular: string;
  completa: boolean;
  estado: boolean;
  facturada: boolean;
  user: User;
};

export type VentasDetalles = {
  id: number;
  cantidad: number;
  concepto: string;
  unitario: number;
  total: number;
  ventas: Ventas;
  precio: Precios;
  user: User;
};

export type FormasPagos = {
  id: number;
  forma: string;
  estado: boolean;
};
export type Pagos = {
  monto: number;
  ventas_id: number;
  formas_pagos_id: number;
};
export type PagosVenta = {
  forma: FormasPagos;
  monto: number;
};
