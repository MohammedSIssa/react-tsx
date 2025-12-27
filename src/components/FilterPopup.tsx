import DropDownFilter from "./DropDownFilter";
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { RiFilterOffFill } from "react-icons/ri";

export default function FilterPopup({
  onFilter,
  data,
  onExit,
  selectedFilterValue,
  setSelectedFilterValue,
  onResetFilter,
}: {
  onFilter: (e: React.FormEvent<HTMLFormElement>) => void;
  data: number[] | string[];
  onExit: () => void;
  selectedFilterValue: number | string;
  setSelectedFilterValue: (value: number | string) => void;
  onResetFilter: () => void;
}) {
  return (
    <div className="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black/30">
      <form
        onSubmit={onFilter}
        className="flex gap-2 rounded-xl border border-neutral-500 bg-white p-10 shadow-xl shadow-black/20 [&_select]:h-fit [&_select]:min-w-[300px] [&_select]:border [&_select]:border-neutral-400 [&_select]:p-2 [&_select]:focus:outline-0"
      >
        <DropDownFilter
          data={data}
          selected={selectedFilterValue}
          setSelected={setSelectedFilterValue}
        />
        <div className="flex flex-col gap-2">
          <button
            type="submit"
            disabled={selectedFilterValue === ""}
            className="w-fit cursor-pointer rounded border border-green-500 p-2 px-5 text-green-400 transition-all duration-200 hover:bg-green-500 hover:text-white disabled:pointer-events-none disabled:opacity-20"
          >
            <FaCheck />
          </button>
          <button
            type="button"
            onClick={onExit}
            className="w-fit cursor-pointer rounded border border-red-500 p-2 px-5 text-red-400 transition-all duration-200 hover:bg-red-500 hover:text-white"
          >
            <FaTimes />
          </button>
          <button
            type="button"
            onClick={onResetFilter}
            className="w-fit cursor-pointer rounded border border-neutral-500 p-2 px-5 text-neutral-400 transition-all duration-200 hover:bg-neutral-500 hover:text-white"
          >
            <RiFilterOffFill />
          </button>
        </div>
      </form>
    </div>
  );
}
