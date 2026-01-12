import { useState } from "react";
import type { User } from "../types";
import { AuthContext } from "./AuthContext";
import API from "../api/api";
import { useEffect } from "react";
// import { useNavigate } from "react-router";

interface Props {
  children: React.ReactNode;
}
export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (user && user?.email) navigate("/dashboard");
  //   else {
  //     navigate("/auth");
  //   }
  // }, [user, navigate]);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const res = await API.post("/auth/login", { email, password });
      setUser(res.data.user);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw new Error(err.response?.data?.error || "Login failed");
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await API.post("/auth/logout");
    } catch (err) {
      console.error(err);
    } finally {
      setUser(null);
    }
  };

  // const checkAuth = async () => {
  //   try {
  //     const res = await API.get("/auth/me"); // optional backend endpoint
  //     setUser(res.data.user);
  //   } catch {
  //     setUser(null);
  //   }
  // };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
