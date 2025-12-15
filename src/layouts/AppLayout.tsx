import { Outlet } from "react-router";
import NavBar from "../components/NavBar";

export default function AppLayout() {
  return (
    <>
      <NavBar />
      <div className="relative min-h-screen bg-linear-to-br from-[#201344] via-[#130d33] to-[#48135f] pb-20 text-white md:pt-30">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.27),transparent_60%)]"></div>
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_bottom,rgba(168,85,247,0.25),transparent_65%)]"></div>
        <div className="relative z-10">
          <Outlet />
        </div>
      </div>
    </>
  );
}
