import { useState } from "react";
import type { Vehicle } from "../types/Vehicle";
import { API } from "../variables/globals";

import { ImSpinner } from "react-icons/im";

export default function CreateVehicle() {
  const [data, setData] = useState<Vehicle>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [feedback, setFeedback] = useState("");

  async function create(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(API + "/vehicles", {
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
            <label>كود المركبة</label>
            <input
              required
              disabled={loading}
              dir="ltr"
              value={data.vehicle_code ?? ""}
              type="number"
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  vehicle_code:
                    e.target.value === "" ? undefined : Number(e.target.value),
                }))
              }
            />

            <label>رقم اللوحة</label>
            <input
              required
              disabled={loading}
              dir="ltr"
              value={data.licence_number ?? ""}
              type="number"
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  licence_number:
                    e.target.value === "" ? undefined : Number(e.target.value),
                }))
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>نوع المركبة</label>
            <input
              required
              disabled={loading}
              value={data.vehicle_type_ar ?? ""}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  vehicle_type_ar:
                    e.target.value === "" ? undefined : e.target.value,
                }))
              }
            />

            <label>نوع المركبة - انجليزي</label>
            <input
              required
              disabled={loading}
              dir="ltr"
              value={data.vehicle_type_en ?? ""}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  vehicle_type_en:
                    e.target.value === "" ? undefined : e.target.value,
                }))
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>الموديل</label>
            <input
              required
              disabled={loading}
              value={data.vehicle_model_ar ?? ""}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  vehicle_model_ar:
                    e.target.value === "" ? undefined : e.target.value,
                }))
              }
            />

            <label>الموديل - انجليزي</label>
            <input
              required
              disabled={loading}
              dir="ltr"
              value={data.vehicle_model_en ?? ""}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  vehicle_model_en:
                    e.target.value === "" ? undefined : e.target.value,
                }))
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>القسم</label>
            <input
              required
              disabled={loading}
              value={data.vehicle_dept ?? ""}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  vehicle_dept:
                    e.target.value === "" ? undefined : e.target.value,
                }))
              }
            />

            <label>الحالة</label>
            <select
              required
              disabled={loading}
              value={data.vehicle_state ?? ""}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  vehicle_state:
                    e.target.value === "" ? undefined : e.target.value,
                }))
              }
            >
              <option value={""}>-- اختر --</option>
              <option value={"تعمل"}>تعمل</option>
              <option value={"لا تعمل"}>لا تعمل</option>
              <option value={"مدمرة"}>مدمرة</option>
            </select>
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-2">
          <label>ملاحظات:</label>
          <textarea
            required
            disabled={loading}
            value={data.notes ?? ""}
            className="resize-none"
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                notes: e.target.value === "" ? undefined : e.target.value,
              }))
            }
          ></textarea>
        </div>
        <button
          disabled={loading}
          className="mt-2 h-fit w-30 cursor-pointer place-items-center bg-blue-500 font-bold text-white"
          type="submit"
        >
          {!loading ? (
            "إضافة الآلية"
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
