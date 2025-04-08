import axios from "axios";
import useAuth from "./auth/useAuth";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/";
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.warn("Token invalido o sesión expirada");
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        useAuth().logout();
      }
    }
  }
);

export default api;
