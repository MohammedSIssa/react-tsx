import { useLocation } from "react-router";
import { API } from "../variables/globals";
import type { Log } from "../types/Log";
import type { Term } from "../types/Term";
import type { Vehicle } from "../types/Vehicle";

import {
  Listbox,
  ListboxOptions,
  ListboxOption,
  ListboxButton,
} from "@headlessui/react";

import { useState, useEffect } from "react";
import { formatDateDDMMYYYY } from "../utils/formatData";
export default function EditLog() {
  const location = useLocation();
  const logData: Log = location.state.log;

  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState(false);

  // On mount; take the data from the navlink
  const [editData, setEditData] = useState<Log>({
    log_date: logData.log_date,
    licence_number: logData.licence_number,
    id: logData.id,
    notes: logData.notes,
    order_num: logData.order_num,
    qty: logData.qty,
    repair_cost: logData.repair_cost,
    repair_desc_ar: logData.repair_desc_ar,
    repair_desc_en: logData.repair_desc_en,
    term_num: logData.term_num,
    total_cost: logData.total_cost,
    unit: logData.unit,
    unit_cost: logData.unit_cost,
    vehicle_code: logData.vehicle_code,
    vehicle_model_en: logData.vehicle_model_en,
    vehicle_type_ar: logData.vehicle_type_ar,
  });

  const [vcodes, setVCodes] = useState<number[]>([]);
  const [selectVCode, setSelectVCode] = useState(logData.vehicle_code);

  const [termNames, setTermNames] = useState<string[]>([]);
  const [selectTermName, setSelectTermName] = useState(logData.repair_desc_ar);

  async function saveEdits(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/logs/${logData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });

      if (res.ok) {
        setError(false);
        setFeedback("تم حفظ التعديلات");
      }
    } catch {
      setError(true);
    }
  }

  // on first mount, get all vcodes from the db.
  useEffect(() => {
    async function getAllVCodes() {
      try {
        const res = await fetch(`${API}/vehicles/vcode/all`);
        if (res.ok) {
          const codes = await res.json();
          setVCodes(codes);
        }
      } catch {
        console.error("Error getting vehicle codes.");
      }
    }

    getAllVCodes();
  }, []);

  // On vehicle code change, update these values
  useEffect(() => {
    async function getDataByVCode() {
      try {
        const res = await fetch(
          `${API}/vehicles/vcode?vehicle_code=${selectVCode}`,
        );
        if (res.ok) {
          const data: Vehicle = await res.json();
          setEditData((prev) => ({
            ...prev,
            vehicle_code: data.vehicle_code,
            licence_number: data.licence_number,
            vehicle_model_en: data.vehicle_model_en,
            vehicle_type_ar: data.vehicle_type_ar,
          }));
        }
      } catch {
        console.error("Error getting vehicle data for", selectVCode);
      }
    }
    getDataByVCode();
  }, [selectVCode]);

  // On repair type change, update these values
  // First, how do we get the repair type??
  // Or just change the term from a list of all term names? and then update those values?
  // So we get all term names on first render.
  useEffect(() => {
    async function getAllTermNames() {
      try {
        const res = await fetch(`${API}/terms/name/all`);
        if (res.ok) {
          const names = await res.json();
          // console.log(names);
          setTermNames(names);
        }
      } catch {
        console.error("Error");
      }
    }
    getAllTermNames();
  }, []);

  // On terms change, update repair description
  useEffect(() => {
    async function getDataByTermName() {
      try {
        const res = await fetch(
          `${API}/terms/name?repair_desc_ar=${selectTermName}`,
        );
        if (res.ok) {
          const d: Term = await res.json();
          setEditData((prev) => ({
            ...prev,
            repair_desc_ar: d.repair_desc_ar,
            repair_desc_en: d.repair_desc_en,
            term_num: d.term_num,
          }));
        }
      } catch {
        console.error("Error");
      }
    }
    if (selectTermName !== "") getDataByTermName();
  }, [selectTermName]);

  useEffect(() => {
    function calculateTotal() {
      const unitCost = editData.unit_cost;
      const repairCost = editData.repair_cost;
      const qty = editData.qty;

      if (unitCost && repairCost && qty) {
        if (qty && +qty > 1) {
          setEditData((prev) => ({
            ...prev,
            total_cost: qty * +unitCost + +repairCost,
          }));
        }

        if (qty && +qty === 1) {
          setEditData((prev) => ({
            ...prev,
            total_cost: +repairCost + +unitCost,
          }));
        }
      }
    }
    calculateTotal();
  }, [editData.unit_cost, editData.repair_cost, editData.qty]);

  return (
    <div className="p-10">
      <form
        onSubmit={saveEdits}
        className="rounded-xl border border-neutral-300 bg-neutral-100 p-10 **:disabled:opacity-25 [&_input]:max-w-fit [&_input]:md:max-w-[400px] [&_input,button,textarea,select]:rounded [&_input,button,textarea,select]:p-1 [&_input,button,textarea,select]:focus:outline-0 [&_input,textarea,select]:bg-neutral-300"
      >
        <div className="flex flex-wrap items-start gap-2">
          <div className="flex flex-col gap-2">
            <label>التاريخ</label>
            <input
              type="date"
              value={editData.log_date ?? ""}
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, log_date: e.target.value }))
              }
            />

            <label>كود المركبة</label>
            <Listbox
              value={selectVCode}
              onChange={setSelectVCode}
              // disabled={loadingVCodes || submitting}
            >
              <div className="relative md:max-w-[500px]">
                {/* Button */}
                <ListboxButton className="w-full rounded bg-neutral-300 p-1 text-right focus:outline-0 disabled:opacity-25">
                  {selectVCode || "-- اختر --"}
                </ListboxButton>

                {/* Options */}
                <ListboxOptions className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded bg-white text-right shadow-lg">
                  {vcodes.map((code, idx) => (
                    <ListboxOption
                      key={idx}
                      value={code}
                      className={({ active, selected }) =>
                        `cursor-pointer px-2 py-1 ${active ? "bg-neutral-200" : ""} ${selected ? "font-bold" : ""} `
                      }
                    >
                      {code}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </div>
            </Listbox>
            <label>اسم البند</label>
            <Listbox
              value={selectTermName}
              onChange={setSelectTermName}
              // disabled={loadingVCodes || submitting}
            >
              <div className="relative min-w-[300px] md:max-w-[500px]">
                {/* Button */}
                <ListboxButton className="w-full rounded bg-neutral-300 p-1 text-right focus:outline-0 disabled:opacity-25">
                  {selectTermName || "-- اختر --"}
                </ListboxButton>

                {/* Options */}
                <ListboxOptions className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded bg-white text-right shadow-lg">
                  {termNames.map((code, idx) => (
                    <ListboxOption
                      key={idx}
                      value={code}
                      className={({ active, selected }) =>
                        `cursor-pointer px-2 py-1 ${active ? "bg-neutral-200" : ""} ${selected ? "font-bold" : ""} `
                      }
                    >
                      {code}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </div>
            </Listbox>
          </div>
          <div className="flex flex-col gap-2">
            <label>الوحدة</label>
            <select
              value={editData.unit ?? ""}
              onChange={(e) => {
                setEditData((prev) => ({ ...prev, unit: e.target.value }));
              }}
            >
              <option value={"لتر"}>لتر</option>
              <option value={"كغم"}>كغم</option>
              <option value={"عدد"}>عدد</option>
              <option value={"أخرى"}>أخرى</option>
            </select>
            <label>كمية التوريد</label>
            <input
              dir="ltr"
              type="number"
              value={editData.qty ? editData.qty : ""}
              onChange={(e) => {
                setEditData((prev) => ({ ...prev, qty: +e.target.value }));
              }}
            />
            <label>تكلفة الوحدة</label>
            <input
              type="number"
              dir="ltr"
              value={editData.unit_cost ? editData.unit_cost : ""}
              onChange={(e) => {
                setEditData((prev) => ({
                  ...prev,
                  unit_cost: +e.target.value,
                }));
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>رقم الطلب</label>
            <input
              value={editData.order_num ?? ""}
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, order_num: e.target.value }))
              }
            />
            <label>تكلفة الصيانة</label>
            <input
              dir="ltr"
              value={editData.repair_cost ? editData.repair_cost : ""}
              type="number"
              onChange={(e) => {
                setEditData((prev) => ({
                  ...prev,
                  repair_cost:
                    e.target.value === "" ? null : Number(e.target.value),
                }));
              }}
            />
            <label>ملاحظات</label>
            <textarea
              value={editData.notes ?? ""}
              className="resize-none"
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, notes: e.target.value }))
              }
            ></textarea>
          </div>
        </div>
        <button type="submit" className="bg-blue-400 font-bold text-white">
          حفظ التعديلات
        </button>
        <p className={error ? "text-red-500" : "text-green-500"}>{feedback}</p>
      </form>
      <div className="preview mt-10">
        <h1 className="mb-3 text-xl font-bold">البيانات:</h1>
        <table>
          <thead>
            <tr className="[&_th]:font-bold">
              <th>التاريخ</th>
              <th>رقم الطلب</th>
              <th>كود المركبة</th>
              <th>نوع المركبة</th>
              <th>رقم اللوحة</th>
              <th>سنة الإنتاج</th>
              <th>كود الصيانة</th>
              <th>البند</th>
              <th>Description</th>
              <th>البيان</th>
              <th>الوحدة</th>
              <th>كمية التوريد</th>
              <th>تكلفة الوحدة</th>
              <th>تكلفة الصيانة</th>
              <th>إجمالي المبلغ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{formatDateDDMMYYYY(editData.log_date ?? "")}</td>
              <td>{editData.order_num}</td>
              <td>{selectVCode}</td>
              <td>{editData.vehicle_type_ar ?? ""}</td>
              <td>{editData.licence_number ?? ""}</td>
              <td dir="ltr">{editData.vehicle_model_en ?? ""}</td>
              <td>{editData.term_num ?? ""}</td>
              <td>{editData.repair_desc_ar ?? ""}</td>
              <td dir="ltr">{editData.repair_desc_en ?? ""}</td>
              <td dir="ltr">
                {`${editData.term_num} ${editData.repair_desc_ar}`}
              </td>
              <td>{editData.unit}</td>
              <td>{editData.qty}</td>
              <td>{editData.unit_cost}</td>
              <td>{editData.repair_cost}</td>
              <td>{editData.total_cost}</td>
              {/* <td>{totalCost > 0 ? totalCost : ""}</td> */}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
