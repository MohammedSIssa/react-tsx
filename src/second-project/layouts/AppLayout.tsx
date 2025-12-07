import { Outlet } from "react-router";
import NavBar from "../components/NavBar";

export default function AppLayout() {
  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="pb-10 md:pt-10 md:pb-0 bg-emerald-100 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}
