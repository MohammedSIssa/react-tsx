import { NavLink } from "react-router";
import ChangeLanguageButton from "./ChangeLanguageButton";

import { MdOutlineMenuOpen } from "react-icons/md";
import { FaRegTimesCircle } from "react-icons/fa";

import { MdCarRepair } from "react-icons/md";
import { RiTruckFill } from "react-icons/ri";
import { LuLogs } from "react-icons/lu";

import { useState } from "react";

export default function NavBar() {
  const [show, setShow] = useState(true);

  return (
    <div className="hide-when-print relative">
      {/* Toggle Button */}
      <button
        className="hide-when-print fixed top-5 left-5 z-50 cursor-pointer rounded-lg bg-slate-900 p-2 text-white"
        onClick={() => setShow(!show)}
      >
        {show ? (
          <FaRegTimesCircle size={25} />
        ) : (
          <MdOutlineMenuOpen size={25} />
        )}
      </button>

      {/* Navbar */}
      <div
        // prettier-ignore
        className={`
          fixed top-0 left-0 
          z-40 
          flex flex-col gap-5 
          h-full w-60 
          transform bg-slate-900 p-5 pt-20
          text-white transition-transform duration-300 ease-in-out 
          ${show ? "translate-x-0" : "-translate-x-full"} 
          [&_.active]:border-emerald-400 
          [&_.active]:bg-emerald-700 
          [&_.active]:text-emerald-50 
          [&_.active]:shadow-lg
          [&_.active]:font-bold
          [&_.active]:shadow-emerald-900 
          [&_a]:flex [&_a]:flex-row-reverse 
          [&_a]:items-center [&_a]:justify-center 
          [&_a]:gap-5 
          [&_a]:rounded-lg 
          [&_a]:border [&_a]:border-slate-600 
          [&_a]:bg-slate-800 
          [&_a]:p-5`
        }
      >
        <NavLink to="/terms">
          بنود الصيانة <MdCarRepair size={30} />
        </NavLink>
        <NavLink to="/vehicles">
          بيانات الآليات <RiTruckFill size={30} />
        </NavLink>
        <NavLink to="/">
          سجل الصيانة <LuLogs size={30} />
        </NavLink>
        <ChangeLanguageButton />
      </div>
    </div>
  );
}
