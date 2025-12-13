import useAuth from "../hooks/useAuth";
import { NavLink } from "react-router";

import { BsCalendar2MinusFill } from "react-icons/bs";
import { TbTargetArrow } from "react-icons/tb";
// import { HiMiniPencilSquare } from "react-icons/hi2";
import { IoStatsChart } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { LuLogs } from "react-icons/lu";

import LogOutButton from "./LogOutButton";

import {
  isAdmin,
  isMonmon,
  isNotLoggedIn,
  isLoggedIn,
} from "../variables/globals";

export default function NavBar() {
  console.log(import.meta.env);
  const { user } = useAuth();
  return (
    <div className="fixed bottom-2 left-1/2 z-50 flex h-fit w-[95%] -translate-x-1/2 items-center justify-center gap-5 rounded-xl border border-white/20 bg-white/10 p-4 px-6 py-4 text-yellow-300 shadow-lg shadow-black/10 backdrop-blur-xl md:top-0 md:right-0 md:m-4 md:w-fit md:translate-x-0">
      <NavLink to={"/"}>
        <FaHome size={30} />
      </NavLink>
      <NavLink to={"/weeks"}>
        <BsCalendar2MinusFill size={24} />
      </NavLink>
      <NavLink to={"/goals"}>
        <TbTargetArrow size={28} />
      </NavLink>
      <NavLink to={"/stats"}>
        <IoStatsChart size={25} />
      </NavLink>
      {/* <NavLink to={"/blogs"}>
        <HiMiniPencilSquare size={27} />
      </NavLink> */}
      {isNotLoggedIn(user?.username ?? null) && (
        <NavLink to={"/login"} state={{ path: location.pathname }}>
          <FiLogIn size={28} />
        </NavLink>
      )}
      {(isAdmin(user?.role ?? 0, user?.apikey ?? "") ||
        isMonmon(user?.role ?? 0, user?.apikey ?? "")) && (
        <NavLink to={"/special"}>
          <FaLock size={25} />
        </NavLink>
      )}
      {isAdmin(user?.role ?? 0, user?.apikey ?? "") && (
        <NavLink to={"/admin/logs"}>
          <LuLogs size={28} />
        </NavLink>
      )}
      {isLoggedIn(user?.username ?? null) && (
        <LogOutButton>
          <MdLogout size={28} />
        </LogOutButton>
      )}
    </div>
  );
}
