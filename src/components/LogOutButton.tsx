import { removeUser } from "../variables/localStorage";
import useAuth from "../hooks/useAuth";

export default function LogOutButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser } = useAuth();
  function logout() {
    removeUser();
    setUser(null);
  }
  return (
    <button className="hover:cursor-pointer" onClick={logout}>
      {children}
    </button>
  );
}
