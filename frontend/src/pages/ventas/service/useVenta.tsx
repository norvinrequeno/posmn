import { useContext } from "react";
import { VentaContext } from "./context";

export default function useVenta() {
  const context = useContext(VentaContext);

  if (!context)
    throw new Error("useVenta no se esta usando dentro de ventasProvider");
  return context;
}
