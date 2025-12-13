import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

export default function RequireUnAuth() {
  const location = useLocation();

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.username || user?.role) {
      navigate(location?.state?.path ?? "/");
    }
  }, [user, navigate, location?.state?.path]);

  return <Outlet />;
}
