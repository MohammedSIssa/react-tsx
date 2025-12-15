import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

export default function RequireAuth({ role }: { role: number }) {
  const { isAdmin, isMonmon, isLoggedIn, isNotLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isNotLoggedIn()) navigate("/login");
    if (isLoggedIn()) {
      if (role === import.meta.env.VITE_MONMON_ROLE) {
        if (!isMonmon() || !isAdmin()) navigate("/");
      } else if (role === import.meta.env.VITE_ADMIN_ROLE) {
        if (!isAdmin()) navigate("/");
      }
    }
  }, [isNotLoggedIn, navigate, isLoggedIn, isMonmon, isAdmin, role]);

  if (isNotLoggedIn()) return null;

  return <Outlet />;
}
