import { useState } from "react";
import type { Term } from "../types/Term";
import { API } from "../variables/globals";

import { ImSpinner } from "react-icons/im";

export default function CreateTerm() {
  const [data, setData] = useState<Term>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [feedback, setFeedback] = useState("");

  async function create(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(API + "/terms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        console.log("Added.");
        setFeedback("تمت الإضافة");
        setData({});
      }
    } catch {
      console.error("Error");
      setFeedback("حصل خطأ أثناء اﻹضافة");
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-10">
      <form
        onSubmit={create}
        className="rounded-xl border border-neutral-300 bg-neutral-100 p-10 **:disabled:opacity-25 [&_input]:md:w-[500px] [&_input,button,textarea,select]:rounded [&_input,button,textarea,select]:p-1 [&_input,button,textarea,select]:focus:outline-0 [&_input,button,textarea,select]:md:max-w-[500px] [&_input,textarea,select]:bg-neutral-300"
      >
        <div className="flex flex-wrap items-end gap-2">
          <div className="flex flex-col gap-2">
            <label>رقم البند</label>
            <input
              required
              disabled={loading}
              dir="ltr"
              value={data.term_num ?? ""}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  term_num: e.target.value === "" ? undefined : e.target.value,
                }))
              }
            />

            <label>نوع الصيانة</label>
            <input
              required
              disabled={loading}
              value={data.repair_type_ar ?? ""}
              type="number"
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  repair_type_ar:
                    e.target.value === "" ? undefined : e.target.value,
                }))
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>نوع الصيانة - انجليزي</label>
            <input
              required
              dir="ltr"
              disabled={loading}
              value={data.repair_type_en ?? ""}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  repair_type_en:
                    e.target.value === "" ? undefined : e.target.value,
                }))
              }
            />

            <label>وصف الصيانة</label>
            <input
              required
              disabled={loading}
              value={data.repair_desc_ar ?? ""}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  repair_desc_ar:
                    e.target.value === "" ? undefined : e.target.value,
                }))
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>وصف الصيانة - انجليزي</label>
            <input
              required
              dir="ltr"
              disabled={loading}
              value={data.repair_desc_en ?? ""}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  repair_desc_en:
                    e.target.value === "" ? undefined : e.target.value,
                }))
              }
            />

            <label>الوحدة</label>
            <input
              required
              disabled={loading}
              value={data.uom ?? ""}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  uom: e.target.value === "" ? undefined : e.target.value,
                }))
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>الكمية</label>
            <input
              required
              disabled={loading}
              value={data.qty ?? ""}
              type="number"
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  qty:
                    e.target.value === "" ? undefined : Number(e.target.value),
                }))
              }
            />

            <label>التكلفة</label>
            <input
              required
              disabled={loading}
              type="number"
              value={data.service_cost ?? ""}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  service_cost:
                    e.target.value === "" ? undefined : Number(e.target.value),
                }))
              }
            />
          </div>
        </div>
        <button
          disabled={loading}
          className="mt-2 h-fit w-30 cursor-pointer place-items-center bg-blue-500 font-bold text-white"
          type="submit"
        >
          {!loading ? (
            "إضافة البند"
          ) : (
            <div className="loading-spinner h-5 w-5">
              <ImSpinner size={20} />
            </div>
          )}
        </button>
        <p
          className={
            error
              ? "text-red-400"
              : loading
                ? "text-neutral-600"
                : "text-green-600"
          }
        >
          {feedback}
        </p>
      </form>
    </div>
  );
}

// {
// vehicle_code,
// licence_number,
// vehicle_type_en,
// vehicle_type_ar,
// vehicle_model_ar,
// vehicle_state,
// vehicle_dept,
// vehicle_model_en,
// notes,
// }

// {
//   repair_type_ar,
//   repair_type_en,
//   repair_desc_ar,
//   repair_desc_en,
//   uom,
//   qty,
//   service_cost,
//   term_num,
// }
