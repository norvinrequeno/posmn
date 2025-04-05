import { JSX } from "react";
import useAuth from "./useAuth";
import { Navigate } from "react-router-dom";

export default function Guard({ children }: { children: JSX.Element }) {
  const { name, token } = useAuth();

  if (!name || name === "" || !token || token === "")
    return <Navigate to="/login" replace />;

  return children;
}
