import { Routes, Route } from "react-router";
import User from "./components/User";
import AppLayout from "./layouts/AppLayout";

import "./custom.css";

export default function Second() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="" element={<h1>Homepage</h1>} />
        <Route path="users/:uid" element={<User />} />
      </Route>
    </Routes>
  );
}
