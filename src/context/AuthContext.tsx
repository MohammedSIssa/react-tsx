import { createContext } from "react";
import { type User } from "../types/User";

export type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAdmin: () => boolean;
  isMonmon: () => boolean;
  isLoggedIn: () => boolean;
  isNotLoggedIn: () => boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);
