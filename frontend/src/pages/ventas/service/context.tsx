import { createContext } from "react";
import {
  AlertType,
  FormasPagos,
  Pagos,
  Ventas,
  VentasDetalles,
} from "../../../types";

interface VentasContextType {
  venta: Ventas | null;
  showCar: boolean;
  message: string;
  typeAlert: AlertType;
  loading: boolean;
  error: boolean;
  carList: VentasDetalles[];
  formasPagos: FormasPagos[];
  addProducto: (cantidad: number, precio_id: number) => void;
  removeProducto: (id: number) => void;
  changeShowCar: () => void;
  setFail: (message: string) => void;
  setSuccess: (message: string) => void;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  sumTotal: number;
  setFacturada: (pagos: Pagos[]) => void;
}

export const VentaContext = createContext<VentasContextType>({
  venta: null,
  showCar: true,
  message: "",
  typeAlert: "info",
  loading: true,
  error: false,
  carList: [],
  formasPagos: [],
  addProducto: () => {},
  removeProducto: () => {},
  changeShowCar: () => {},
  setMessage: () => {},
  setFail: () => {},
  setSuccess: () => {},
  setFacturada: () => {},
  sumTotal: 0,
});
