import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

export default function RequireAuth({ role }: { role: number }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.username || (user?.role !== 1 && user?.role !== role)) {
      navigate("/login");
    }
  }, [user, role, navigate]);

  if (!user?.username || (user?.role !== 1 && user?.role !== role)) {
    return null;
  }

  return <Outlet />;
}
