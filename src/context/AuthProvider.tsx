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
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
