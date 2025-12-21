import { Routes, Route } from "react-router";
import { lazy } from "react";

import Logs from "./pages/Logs";
const CreateLog = lazy(() => import("./pages/CreateLog"));
const EditLog = lazy(() => import("./pages/EditLog"));

const CreateVehicle = lazy(() => import("./pages/CreateVehicle"));
const EditVehicle = lazy(() => import("./pages/EditVehicle"));
const Vehicles = lazy(() => import("./pages/Vehicles"));

const CreateTerm = lazy(() => import("./pages/CreateTerm"));
const EditTerm = lazy(() => import("./pages/EditTerm"));
const Terms = lazy(() => import("./pages/Terms"));

import NavBar from "./components/NavBar";

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" index element={<Logs />} />
        <Route path="/create/vehicle" element={<CreateVehicle />} />
        <Route path="/edit/vehicle" element={<EditVehicle />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/create/term" element={<CreateTerm />} />
        <Route path="/edit/term" element={<EditTerm />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/create/log" element={<CreateLog />} />
        <Route path="/edit/log" element={<EditLog />} />
      </Routes>
    </>
  );
}
