import { createContext } from "react";

interface AuthContexType {
  name: string;
  token: string;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContexType>({
  name: "",
  token: "",
  login: async () => {
    console.log("No se cargo el contexto");
    localStorage.removeItem("token");
  },
  logout: () => {},
});
