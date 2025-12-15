import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

export default function RequireUnAuth() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return <Outlet />;
}
