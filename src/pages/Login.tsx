import useAuth from "../hooks/useAuth";
import { useState, type FormEvent } from "react";
import type { User } from "../types/User";
import { saveUser } from "../variables/localStorage";

import { DEV_API } from "../variables/globals";

import { FaDoorOpen } from "react-icons/fa";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loggingIn, setLoggingIn] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");

  const inputsClassName: string = `border-2 border-white/10 bg-white/5 backdrop-blur-xl focus:outline-0 p-1 px-2 w-full rounded-lg ${
    loggingIn ? "opacity-30" : ""
  } ${error ? "border border-red-400" : "border-0"}`;

  const { setUser } = useAuth();

  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!username.trim() || !password.trim()) return;

    try {
      setFeedback("جار تسجيل الدخول");
      setLoggingIn(true);
      setError(false);
      const res = await fetch(`${DEV_API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error("Login failed");
      }

      const user: User = await res.json();
      setUser(user);
      saveUser(user);
    } catch (err) {
      console.error(err);
      setFeedback("خطأ في تسجيل الدخول");
      setUsername("");
      setError(true);
      setPassword("");
    } finally {
      setLoggingIn(false);
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center md:h-fit md:p-20">
      <form
        onSubmit={login}
        className="flex w-full flex-col items-center justify-center gap-4 border-t-2 border-b-2 border-white/20 bg-white/5 p-5 py-10 shadow-2xl shadow-black/20 backdrop-blur-xl md:w-[95%] md:max-w-[400px] md:rounded-xl md:border-2 [&_input]:shadow-xl [&_input]:shadow-black/10"
      >
        <FaDoorOpen
          size={50}
          className="mb-10 text-violet-200/80 drop-shadow-2xl drop-shadow-violet-500"
        />
        <input
          className={inputsClassName}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loggingIn}
          placeholder="اسم المستخدم"
        />

        <input
          className={inputsClassName}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loggingIn}
          placeholder="كلمة المرور"
        />
        <p>{feedback}</p>
        <button
          type="submit"
          className="w-full cursor-pointer rounded-lg border-0 bg-linear-to-b from-[#5a36e9] via-[#805afe] to-[#5a36e9] p-1 px-2 hover:brightness-105 focus:outline-0"
        >
          سجل الدخول
        </button>
      </form>
    </div>
  );
}
