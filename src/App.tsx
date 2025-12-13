import { Routes, Route } from "react-router";
import { lazy, Suspense } from "react";

import AuthProvider from "./context/AuthProvider";

// Static imports
import AppLayout from "./layouts/AppLayout";
import RequireAuth from "./components/RequireAuth";
import RequireUnAuth from "./components/RequireUnAuth";

// Dynamic imports
const Login = lazy(() => import("./pages/Login"));

export default function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<div>loading..</div>}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route
              path=""
              element={
                <div className="flex items-center justify-center p-4">
                  {/* <EditPost post={fakePost} /> */}
                </div>
              }
            />
            <Route element={<RequireUnAuth />}>
              <Route path="login" element={<Login />} />
            </Route>

            {/* Admin routes */}
            <Route element={<RequireAuth role={1} />}></Route>

            {/* Monmon routes */}
            <Route element={<RequireAuth role={2} />}></Route>
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}
