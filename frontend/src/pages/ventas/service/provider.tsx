import React, { useEffect, useState } from "react";
import { AlertType, FormasPagos, Ventas, VentasDetalles } from "../../../types";
import api from "../../../api";
import { VentaContext } from "./context";

export default function VentasProvider({
  children,
  id,
}: {
  children: React.ReactNode;
  id: number;
}) {
  const [venta, setVenta] = useState<Ventas | null>(null);
  const [showCar, setShowCar] = useState(true);
  const [message, setMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState<AlertType>("info");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [carList, setCarList] = useState<VentasDetalles[]>([]);
  const [formasPagos, setFormasPagos] = useState<FormasPagos[]>([]);
  const getVenta = async () => {
    setLoading(true);
    try {
      const { data, status } = await api.get(`ventas/${id}`);
      if (status === 200 && data) {
        setVenta(data.venta);
        setCarList(data.detalle);
        setFormasPagos(data.formas);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addProducto = async (cantidad: number, precio_id: number) => {
    try {
      const { data, status } = await api.post("ventas_detalles", {
        cantidad,
        precio_id,
        ventas_id: venta?.id,
      });
      if (status === 201 && data) {
        setMessage("Se agrego correctamente");
        setTypeAlert("success");
        setCarList([...carList, data]);
        hideMessage();
      } else {
        setMessage(
          "Ocurrió un problema al agregar, verifique si su sesión esta activa. Actualice la pagina e intente de nuevo"
        );
        setTypeAlert("success");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const removeProducto = async (id: number) => {
    try {
      const { status } = await api.delete(`ventas_detalles/${id}`);
      if (status === 200) {
        setMessage("Se elimino correctamente");
        setTypeAlert("success");
        hideMessage();
        setCarList((prev) => prev.filter((d) => d.id !== id));
      } else {
        setMessage(
          "Ocurrió un problema al eliminar, verifique si su sesión esta activa. Actualice la pagina e intente de nuevo"
        );
        setTypeAlert("success");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sumTotal = carList.reduce((acc: number, p) => acc + p.total, 0);
  const changeShowCar = () => setShowCar(!showCar);

  function setFail(message: string) {
    setTypeAlert("error");
    setMessage(message);
  }
  function setSuccess(message: string) {
    setTypeAlert("success");
    setMessage(message);
  }
  const hideMessage = () => {
    setTimeout(() => setMessage(""), 4000);
  };

  useEffect(() => {
    getVenta();
  }, [id]);

  useEffect(() => {
    let isMounted = true;

    queueMicrotask(() => {
      if (!isMounted) return;

      if (!venta) {
        setError(true);
        setMessage("No se encontró la venta que busca");
        setTypeAlert("error");
      } else if (!venta.estado && !venta.facturada) {
        setError(true);
        setMessage("Esta venta ya no está activa");
        setTypeAlert("warning");
      } else if (venta.facturada) {
        setError(true);
        setMessage("Esta venta ya fue facturada");
        setTypeAlert("success");
      } else {
        setMessage("");
        setError(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [venta]);

  return (
    <VentaContext.Provider
      value={{
        venta,
        showCar,
        message,
        typeAlert,
        loading,
        error,
        carList,
        formasPagos,
        addProducto,
        removeProducto,
        changeShowCar,
        setMessage,
        setFail,
        setSuccess,
        sumTotal,
      }}
    >
      {children}
    </VentaContext.Provider>
  );
}
