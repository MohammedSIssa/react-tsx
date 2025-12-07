import { Routes, Route } from "react-router";
import User from "./components/User";

export default function Second() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/users/:uid" element={<User />} />
    </Routes>
  );
}
