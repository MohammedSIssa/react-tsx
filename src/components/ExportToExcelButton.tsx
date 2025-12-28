import { LiaFileDownloadSolid } from "react-icons/lia";
import type { Log } from "../types/Log";
import type { Vehicle } from "../types/Vehicle";
import type { Term } from "../types/Term";

export default function ExportToExcel({
  onClick,
}: {
  onClick: (data: Log[] | Vehicle[] | Term[]) => void;
}) {
  const handleClick = () => {
    onClick([]);
  };

  return (
    <button
      className="hide-when-print flex cursor-pointer items-center justify-center rounded-lg bg-green-600 p-2 text-white shadow-sm transition-colors duration-200 hover:bg-green-700"
      onClick={handleClick}
      title="Export to Excel"
    >
      <LiaFileDownloadSolid size={24} />
    </button>
  );
}
