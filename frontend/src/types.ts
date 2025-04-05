import { JSX } from "react";

export type LinkMenuType = {
  to?: string;
  click?: () => void;
  name: string;
  icon: JSX.Element;
};
