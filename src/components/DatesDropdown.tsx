import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

import { formatDateDDMMYYYY } from "../utils/formatData";

export default function DatesDropdown({
  data,
  selected,
  setSelected,
}: {
  data: number[] | string[];
  selected: number | string;
  setSelected: (value: string) => void;
}) {
  return (
    <Listbox value={String(selected ?? "")} onChange={setSelected}>
      <div className="relative w-[300px]">
        {/* Button */}
        <ListboxButton className="h-fit w-full min-w-[300px] rounded border border-neutral-400 p-2 text-right focus:outline-0 disabled:opacity-25">
          {selected || "-- اختر --"}
        </ListboxButton>

        {/* Options */}
        <ListboxOptions className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded bg-white text-right shadow-lg">
          {[...data].map((dataItem, idx) => (
            <ListboxOption
              key={idx}
              value={dataItem}
              className={({ active }) =>
                `cursor-pointer px-2 py-1 ${active ? "bg-neutral-200" : ""}`
              }
            >
              {formatDateDDMMYYYY(String(dataItem))}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
