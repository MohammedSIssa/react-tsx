import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import { useState } from "react";
import { NavLink } from "react-router";
import { FaPlus } from "react-icons/fa";

export default function AppLayout() {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  interface Position {
    x: number;
    y: number;
  }

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault(); // prevent default context menu
    setPosition({ x: e.clientX, y: e.clientY }); // save mouse position
    setShow((prev) => !prev); // toggle the component
  };
  return (
    <div className="relative" onContextMenu={handleRightClick}>
      {show && (
        <div
          style={{
            position: "absolute",
            top: position.y,
            left: position.x,
            transform: "translate(-50%, -50%)",
            padding: "15px",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
          className="z-999 flex flex-col gap-5 bg-white [&_a]:border-b [&_a]:border-slate-400 [&_a]:last-of-type:border-0 [&_a]:hover:bg-slate-100"
        >
          <NavLink
            onClick={() => setShow(false)}
            className="flex items-center gap-2 p-2"
            to={"/create/log"}
          >
            <FaPlus />
            <span>إضافة سجل</span>
          </NavLink>

          <NavLink
            onClick={() => setShow(false)}
            className="flex items-center gap-2 p-2"
            to={"/create/term"}
          >
            <FaPlus />
            <span>إضافة بند</span>
          </NavLink>

          <NavLink
            onClick={() => setShow(false)}
            className="flex items-center gap-2 p-2"
            to={"/create/vehicle"}
          >
            <FaPlus />
            <span>إضافة آلية</span>
          </NavLink>
        </div>
      )}
      <NavBar />
      <Outlet />
    </div>
  );
}
