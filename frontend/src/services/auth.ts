import api from "../api";
interface LoginResponse {
  access_token: string;
  name: string;
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const rs = await api.post<LoginResponse>("auth/login", { email, password });
  return rs.data;
};
