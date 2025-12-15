import { Routes, Route } from "react-router";
import { lazy, Suspense } from "react";

import AuthProvider from "./context/AuthProvider";

// Static imports
import AppLayout from "./layouts/AppLayout";
import RequireAuth from "./components/RequireAuth";
import RequireUnAuth from "./components/RequireUnAuth";

// Dynamic imports
const Login = lazy(() => import("./pages/Login"));
const Content = lazy(() => import("./pages/Content"));
const Logs = lazy(() => import("./pages/Admin/Logs"));
const Homepage = lazy(() => import("./pages/Homepage"));

export default function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<div>loading..</div>}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="" element={<Homepage />} />
            <Route element={<RequireUnAuth />}>
              <Route path="login" element={<Login />} />
            </Route>

            {/* Admin routes */}
            <Route element={<RequireAuth role={1} />}>
              <Route path="logs" element={<Logs />} />
            </Route>

            {/* Public Routes */}
            <Route path=":type/:storyid" element={<Content />} />

            {/* Secret Routes */}
            <Route element={<RequireAuth role={2} />}></Route>
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}
