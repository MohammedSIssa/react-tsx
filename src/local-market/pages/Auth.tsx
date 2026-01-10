import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/api";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const Auth: React.FC = () => {
  const auth = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.user) {
      navigate("/dashboard");
    }
  }, [navigate, auth?.user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;

    try {
      if (isLogin) {
        // Use AuthContext login
        await auth.login(email, password);
      } else {
        // Use Axios + cookie-based registration
        const res = await API.post("/auth/register", {
          name,
          email,
          password,
        });

        if (res.status === 200) {
          // Auto-login after registration
          await auth.login(email, password);
        }
      }

      // window.location.href = "/dashboard";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(
        err.response?.data?.error || err.message || "Something went wrong",
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow">
        <div className="mb-6 flex justify-center">
          <button
            onClick={() => setIsLogin(true)}
            className={`border-b-2 px-4 py-2 font-semibold ${
              isLogin
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-500"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`border-b-2 px-4 py-2 font-semibold ${
              !isLogin
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-500"
            }`}
          >
            Register
          </button>
        </div>

        {error && <p className="mb-4 text-center text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded border px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full rounded bg-blue-500 py-2 font-semibold text-white transition hover:bg-blue-600"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
