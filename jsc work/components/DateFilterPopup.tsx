import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { RiFilterOffFill } from "react-icons/ri";
import {
  toDDMMYYYY,
  todayYYYYMMDD,
  daysAgoYYYYMMDD,
} from "../utils/formatData";

export type DateFilter = {
  from: string | null; // YYYY-MM-DD
  to: string | null;
};

interface DateFilterPopupProps {
  dates: string[]; // existing dates
  value: DateFilter;
  onChange: (filter: DateFilter) => void;
  onApply: () => void;
  onExit: () => void;
  onResetFilter: () => void;
}

export default function DateFilterPopup({
  dates,
  value,
  onChange,
  onApply,
  onExit,
  onResetFilter,
}: DateFilterPopupProps) {
  return (
    <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black/30 [&_button]:hover:cursor-pointer">
      <div className="flex min-w-[320px] gap-4 rounded-xl border border-neutral-500 bg-white p-8 shadow-xl shadow-black/20">
        <div className="flex flex-col gap-4">
          <p className="font-semibold">من الجدول</p>
          <div className="max-full flex max-h-40 flex-wrap gap-2 overflow-x-auto overflow-y-auto md:max-w-[400px]">
            {dates.map((date) => (
              <button
                key={date}
                type="button"
                onClick={() => onChange({ from: date, to: date })}
                className={`rounded border px-3 py-1 text-xs transition ${
                  value.from === date && value.to === date
                    ? "border-green-500 bg-green-500 text-white"
                    : "border-neutral-400"
                }`}
              >
                {toDDMMYYYY(date)}
              </button>
            ))}
          </div>

          <p className="mt-4 font-semibold">إعدادات جاهزة</p>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() =>
                onChange({ from: daysAgoYYYYMMDD(7), to: todayYYYYMMDD() })
              }
              className="rounded border border-neutral-400 px-3 py-1 text-sm hover:bg-neutral-200"
            >
              آخر أسبوع
            </button>
            <button
              type="button"
              onClick={() =>
                onChange({ from: daysAgoYYYYMMDD(30), to: todayYYYYMMDD() })
              }
              className="rounded border border-neutral-400 px-3 py-1 text-sm hover:bg-neutral-200"
            >
              آخر شهر
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className="font-semibold">مدى مخصص</p>
          <div className="flex flex-col gap-2">
            <label>
              من:
              <input
                type="date"
                value={value.from ?? ""}
                onChange={(e) =>
                  onChange({ ...value, from: e.target.value || null })
                }
                className="mt-1 rounded border border-neutral-400 p-2"
              />
            </label>
            <label>
              إلى:
              <input
                type="date"
                value={value.to ?? ""}
                onChange={(e) =>
                  onChange({ ...value, to: e.target.value || null })
                }
                className="mt-1 rounded border border-neutral-400 p-2"
              />
            </label>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={onApply}
              disabled={!value.from && !value.to}
              className="flex items-center gap-1 rounded border border-green-500 bg-green-100 px-3 py-1 text-green-600 hover:bg-green-500 hover:text-white disabled:pointer-events-none disabled:opacity-30"
            >
              <FaCheck /> تطبيق
            </button>
            <button
              type="button"
              onClick={onExit}
              className="flex items-center gap-1 rounded border border-red-500 bg-red-100 px-3 py-1 text-red-600 hover:bg-red-500 hover:text-white"
            >
              <FaTimes /> إغلاق
            </button>
            <button
              type="button"
              onClick={onResetFilter}
              className="flex items-center gap-1 rounded border border-neutral-500 bg-neutral-100 px-3 py-1 text-neutral-600 hover:bg-neutral-500 hover:text-white"
            >
              <RiFilterOffFill /> إلغاء الفلاتر
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
