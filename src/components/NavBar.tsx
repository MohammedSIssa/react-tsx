import { NavLink } from "react-router";
import { FaPrint } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";

export default function NavBar() {
  return (
    <div className="hide-when-print mb-5 flex flex-row-reverse items-center justify-between border-b bg-violet-100 p-2 px-5">
      <div className="flex gap-2 [&_.active]:border-2 [&_.active]:border-red-600 [&_.active]:bg-red-600 [&_.active]:text-white [&_a]:border-2 [&_a]:bg-transparent [&_a]:text-red-600">
        <button
          className="flex cursor-pointer items-center gap-2 rounded bg-blue-500 p-2 text-white"
          onClick={() => window.print()}
        >
          <FaPrint />
          <span>طباعة</span>
        </button>
        <NavLink
          className="flex items-center gap-2 rounded p-2"
          to={"/create/log"}
        >
          <FaPlus />
          <span>إضافة سجل</span>
        </NavLink>

        <NavLink
          className="flex items-center gap-2 rounded p-2"
          to={"/create/term"}
        >
          <FaPlus />
          <span>إضافة بند</span>
        </NavLink>

        <NavLink
          className="flex items-center gap-2 rounded p-2"
          to={"/create/vehicle"}
        >
          <FaPlus />
          <span>إضافة آلية</span>
        </NavLink>
      </div>

      <div className="flex gap-6 [&_.active]:border-b-2 [&_.active]:font-bold">
        <NavLink to="/terms">بنود الصيانة</NavLink>
        <NavLink to="/vehicles">بيانات الآليات</NavLink>
        <NavLink to="/">سجل الصيانة</NavLink>
      </div>
    </div>
  );
}
