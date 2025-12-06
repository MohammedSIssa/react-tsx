import { useState } from "react";
import { UserContext } from "./contexts/UserContext";

export interface User {
  name: string;
  age: number;
  isMarried: boolean;
}

interface Props {
  children: React.ReactNode;
}

export const UserProvider = (props: Props) => {
  const [users, setUsers] = useState<User[]>([]);

  const addUser = (user: User) => setUsers((users) => [...users, user]);
  const updateUser = (id: string) => id;
  const deleteUser = (id: string) => id;

  return (
    <UserContext.Provider value={{ users, addUser, deleteUser, updateUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
