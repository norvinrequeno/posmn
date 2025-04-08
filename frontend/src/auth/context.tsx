import { createContext } from "react";

interface AuthContexType {
  name: string;
  token: string;
  login: (email: string, password: string) => void;
  logout: () => void;
  changeMenu: () => void;
  menu: boolean;
}

export const AuthContext = createContext<AuthContexType>({
  name: "",
  token: "",
  login: async () => {
    console.log("No se cargo el contexto");
    localStorage.removeItem("token");
  },
  logout: () => {},
  changeMenu: () => {},
  menu: false,
});
