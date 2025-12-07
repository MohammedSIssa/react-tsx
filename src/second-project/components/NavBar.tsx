import { NavLink } from "react-router";

export default function NavBar() {
  return <div className="flex gap-2 items-center justify-center text-white fixed bottom-0 left-0 w-full h-10 bg-emerald-400 md:top-0">
    <NavLink to='/'>Home</NavLink>
    <NavLink to='/users/1'>User 1</NavLink>
  </div>
}