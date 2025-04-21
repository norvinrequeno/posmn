import Layout from "../../components/Layout";
import { useParams } from "react-router-dom";
import VentasProvider from "./service/provider";
import VentasApp from "./VentasApp";
import Alert from "../../components/Alert";

export default function VentasPage() {
  const { id } = useParams();

  if (!id || isNaN(parseInt(id))) {
    return (
      <Layout title="Error">
        <Alert
          message="Venta invalida, el identificador debe ser un numero mayor a cero"
          type="error"
          setMessage={() => {}}
        />
      </Layout>
    );
  }
  return (
    <VentasProvider id={parseInt(id)}>
      <VentasApp />
    </VentasProvider>
  );
}
