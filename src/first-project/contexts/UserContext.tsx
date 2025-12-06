import { type User } from "../userContext";
import { createContext } from "react";

interface UserContextType {
  users: User[] | null;
  addUser: (user: User) => void;
  updateUser: (id: string) => void;
  deleteUser: (id: string) => void;
}

const initialContext = {
  users: null,
  addUser: () => null,
  updateUser: () => null,
  deleteUser: () => null,
};

export const UserContext = createContext<UserContextType>(initialContext);
