import { JSX } from "react";

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
