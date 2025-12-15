import { AuthContext } from "./AuthContext";
import { useState } from "react";
import { type User } from "../types/User";
import { loadUser } from "../variables/localStorage";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(loadUser());

  const isAdmin = (): boolean =>
    user?.role === +import.meta.env.VITE_ADMIN_ROLE &&
    user?.apikey === import.meta.env.VITE_ADMIN_API;

  const isMonmon = (): boolean =>
    user?.role === +import.meta.env.VITE_MONMON_ROLE &&
    user?.apikey === import.meta.env.VITE_MONMON_API;

  const isNotLoggedIn = (): boolean => user === null;

  const isLoggedIn = (): boolean => user !== null;
  return (
    <AuthContext.Provider
      value={{ user, setUser, isAdmin, isMonmon, isNotLoggedIn, isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
}
