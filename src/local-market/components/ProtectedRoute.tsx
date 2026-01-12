import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  if (auth?.loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (!auth?.user) {
    navigate("/auth");
  }

  return <>{children}</>;
};

export default ProtectedRoute;
