import { useState } from "react";
import axios from "axios";
import axiosInstance from "@/lib/axios";
import setAuthToken from "@/lib/setAuthToken";

interface LoginValues {
  username: string;
  password: string;
}

interface RegisterValues {
  username: string;
  email: string;
  password: string;
}

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (values: LoginValues): Promise<string | null> => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.post("/auth/login", values);
      const token = res.data.token;
      setAuthToken(token);
      setToken(token);
      return token;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Login gagal");
      } else {
        setError("Terjadi kesalahan yang tidak diketahui");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  const register = async (values: RegisterValues): Promise<string | null> => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.post("/users", values);
      const token = res.data.token;
      setAuthToken(token);
      setToken(token);
      return token;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Registrasi gagal");
      } else {
        setError("Terjadi kesalahan yang tidak diketahui");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setAuthToken(null);
  };

  return {
    login,
    register,
    logout,
    token,
    isAuthenticated: !!token,
    loading,
    error,
  };
};
