import { useContext } from "react";
import { AuthContext } from "./context";

export default function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth no esta definido dentro del contexto AuthProvider"
    );
  }
  return context;
}
