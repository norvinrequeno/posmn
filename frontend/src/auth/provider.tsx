import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { AuthContext } from "./context";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const getUser = () => {
    try {
      const uToken = localStorage.getItem("token");
      const uName = localStorage.getItem("name");
      if (uToken && uToken !== null && uName && uName !== null) {
        setName(uName);
        setToken(uToken);
      }
    } catch (err) {
      console.log(err);
      logout();
    }
  };
  const login = async (email: string, password: string) => {
    try {
      const { data, status } = await api.post("auth/login", {
        email,
        password,
      });
      console.log(status);

      if (status === 201 && data.access_token && data.name) {
        localStorage.setItem("name", data.name);
        localStorage.setItem("token", data.access_token);
        setName(data.name);
        setToken(data.access_token);
        navigate("/dashboard");
      } else {
        throw new Error("Error al autenticar");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setName("");
    setToken("");
    navigate("/login");
  };

  useState(() => {
    getUser();
  });

  return (
    <AuthContext.Provider value={{ name, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
