import type { User } from "../types/User";

export const loadUser = (): User | null => {
  const stored = localStorage.getItem("user");
  if (!stored) return null;

  try {
    return JSON.parse(stored) as User;
  } catch {
    return null;
  }
};

export const saveUser = (user: User): void =>
  localStorage.setItem("user", JSON.stringify(user));

export const removeUser = (): void => localStorage.removeItem("user");
