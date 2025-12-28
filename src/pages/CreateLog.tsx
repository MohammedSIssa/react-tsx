import { useState, useEffect } from "react";
import { API } from "../variables/globals";
import type { Term } from "../types/Term";
import type { Vehicle } from "../types/Vehicle";

import useLanguage from "../hooks/useLanguage";

import { formatDateDDMMYYYY } from "../utils/formatData";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import type { Log } from "../types/Log";

export default function CreateLog() {
  const [vcodes, setVCodes] = useState<string[]>([]);
  const [loadingVCodes, setLoadingVCodes] = useState(true);
  const [selectVCode, setSelectVCode] = useState("");

  const [loadingTypesAr, setLoadingTypesAr] = useState(true);
  const [allTypes, setAllTypes] = useState<string[]>([]);
  const [selectRepairType, setSelectRepairType] = useState("");

  const [termNames, setTermNames] = useState<string[]>([]);
  const [loadingTermNames, setLoadingTermNames] = useState(true);
  const [selectTermName, setSelectTermName] = useState("");

  const [vehicleData, setVehicleData] = useState<Vehicle | null>(null);
  const [termsData, setTermsData] = useState<Term | null>(null);
  const [logsData, setLogsData] = useState<Log | null>({});

  const [date, setDate] = useState(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  });
  const [orderNum, setOrderNum] = useState("");
  const [unit, setUnit] = useState("");
  const [qty, setQty] = useState("");
  const [unitCost, setUnitCost] = useState("");
  const [cost, setCost] = useState("");
  const [notes, setNotes] = useState("");

  const [totalCost, setTotalCost] = useState(0);

  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState(false);

  const { language } = useLanguage();

  // Create log function
  async function create(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (selectTermName !== "" && selectVCode !== "") {
      try {
        setError(false);
        setSubmitting(true);
        setFeedback(
          language === "english" ? "Adding log..." : "جار اضافة سجل..",
        );
        const res = await fetch(`${API}/logs`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(logsData),
        });

        if (res.ok) {
          console.log("added");
          setFeedback(
            language === "english"
              ? "Added log successfully"
              : "تمت اضافة السجل بنجاح",
          );
          setLogsData({});
        }
      } catch {
        console.error("failed to add log");
        setError(true);
      } finally {
        setSubmitting(false);
      }
    } else {
      setError(true);
      setFeedback("يرجى ادخال كود المركبة والبند");
    }
  }

  // Update logs data when [unit, qty, unitCost, cost, totalCost, date, notes, orderNum] changes
  useEffect(() => {
    setLogsData((prev) => ({
      ...prev,
      logs_date: date ? date : "",
      unit: unit ? unit : "",
      qty: qty ? +qty : 0,
      unit_cost: unitCost ? +unitCost : 0,
      repair_cost: cost ? +cost : 0,
      total_cost: totalCost ? totalCost : 0,
      notes: notes ? notes : "",
      order_num: orderNum ? orderNum : "",
    }));
  }, [unit, qty, unitCost, cost, totalCost, date, notes, orderNum]);

  // On first render, get all repair types in arabic
  useEffect(() => {
    async function getRepairTypes() {
      try {
        const res = await fetch(`${API}/terms/type/all`);
        if (res.ok) {
          const types = await res.json();
          setAllTypes(types);
        }
      } catch {
        console.error("Error");
      } finally {
        setLoadingTypesAr(false);
      }
    }

    getRepairTypes();
  }, []);

  // On first render, get all vehicle codes:
  useEffect(() => {
    async function getAllVehicleCodes() {
      try {
        const res = await fetch(`${API}/vehicles/vcode/all`);
        if (res.ok) {
          const codes = await res.json();
          setVCodes(codes);
        }
      } catch {
        console.log("Error.");
      } finally {
        setLoadingVCodes(false);
      }
    }
    getAllVehicleCodes();
  }, []);

  // On repair type change, update terms
  useEffect(() => {
    async function getDataByRepairType() {
      try {
        const res = await fetch(`${API}/terms/type/${selectRepairType}`);
        setTermNames([]);
        setSelectTermName("");
        if (res.ok) {
          const termss = await res.json();
          setTermNames(termss);
        }
      } catch {
        console.error("ERror");
      } finally {
        setLoadingTermNames(false);
      }
    }
    if (selectRepairType.trim() !== "") {
      getDataByRepairType();
    }
  }, [selectRepairType]);

  // On terms change, update repair description
  useEffect(() => {
    async function getDataByTermName() {
      try {
        setTermsData(null);
        const res = await fetch(`${API}/terms/name?search=${selectTermName}`);
        if (res.ok) {
          const d = await res.json();
          setTermsData(d);
          setLogsData((prev) => ({
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

  // On vehicle code change, update all vehicle data
  useEffect(() => {
    async function getVehicleDataByVCode() {
      try {
        setVehicleData(null);
        const res = await fetch(`${API}/vehicles/vcode/${selectVCode}`);
        if (res.ok) {
          const d: Vehicle = await res.json();
          setVehicleData(d);
          setLogsData((prev) => ({
            ...prev,
            licence_number: d.licence_number,
            vehicle_code: d.vehicle_code,
            vehicle_model_ar: d.vehicle_model_ar,
            vehicle_model_en: d.vehicle_model_en,
            vehicle_type_ar: d.vehicle_type_ar,
            vehicle_type_en: d.vehicle_type_en,
          }));
        }
      } catch {
        console.error("Error");
      }
    }
    if (selectVCode !== "") getVehicleDataByVCode();
  }, [selectVCode]);

  // Calculate total cost on change of unitCost, cost, qty
  useEffect(() => {
    const total: number | null =
      +qty === 1
        ? +cost + +unitCost
        : +qty > 1
          ? +cost + +qty * +unitCost
          : null;

    setTotalCost(total ? total : 0);
  }, [unitCost, qty, cost]);

  return (
    <div className="p-10">
      <form
        onSubmit={create}
        className="rounded-xl border border-neutral-300 bg-neutral-100 p-10 **:disabled:opacity-25 [&_input,button,textarea,select]:rounded [&_input,button,textarea,select]:p-1 [&_input,button,textarea,select]:focus:outline-0 [&_input,textarea,select]:bg-neutral-300"
      >
        <div className="flex flex-wrap items-end gap-2">
          <div className="flex flex-col gap-2">
            <label>رقم الطلب</label>
            <input
              value={orderNum}
              onChange={(e) => setOrderNum(e.target.value)}
              disabled={submitting}
            />
            <label>التاريخ</label>
            <input
              disabled={submitting}
              required
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <label>كود المركبة</label>

            <Listbox
              value={selectVCode}
              onChange={setSelectVCode}
              disabled={loadingVCodes || submitting}
            >
              <div className="relative md:max-w-[500px]">
                {/* Button */}
                <ListboxButton className="w-full rounded bg-neutral-300 p-1 text-right focus:outline-0 disabled:opacity-25">
                  {selectVCode || "-- اختر --"}
                </ListboxButton>

                {/* Options */}
                <ListboxOptions className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded bg-white text-right shadow-lg">
                  {!loadingVCodes &&
                    vcodes.map((code, idx) => (
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
            <label>نوع الصيانة</label>
            <select
              disabled={loadingTypesAr || submitting}
              value={selectRepairType}
              onChange={(e) => {
                setSelectRepairType(e.target.value);
              }}
            >
              <option value={""}>-- اختر--</option>
              {allTypes.map((term, idx) => (
                <option key={idx} value={term}>
                  {term}
                </option>
              ))}
            </select>

            <label>بند الصيانة</label>

            <Listbox
              value={selectTermName}
              onChange={setSelectTermName}
              disabled={loadingTermNames || submitting}
            >
              <div className="relative md:max-w-[500px]">
                {/* Button */}
                <ListboxButton className="w-full rounded bg-neutral-300 p-1 text-right focus:outline-0 disabled:opacity-25">
                  {selectTermName || "-- اختر البند --"}
                </ListboxButton>

                {/* Options */}
                <ListboxOptions className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded bg-white text-right shadow-lg">
                  {termNames.map((term, idx) => (
                    <ListboxOption
                      key={idx}
                      value={term}
                      className={({ active }) =>
                        `cursor-pointer px-2 py-1 ${
                          active ? "bg-neutral-200" : ""
                        }`
                      }
                    >
                      {term}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </div>
            </Listbox>

            <label>الوحدة</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              disabled={submitting}
            >
              <option value={""}>--اختر--</option>
              <option value={"لتر"}>لتر</option>
              <option value={"كغم"}>كغم</option>
              <option value={"عدد"}>عدد</option>
              <option value={"أخرى"}>أخرى</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label>كمية التوريد</label>
            <input
              type="number"
              disabled={submitting}
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
            <label>تكلفة الوحدة</label>
            <input
              disabled={submitting}
              type="number"
              value={unitCost}
              onChange={(e) => setUnitCost(e.target.value)}
            />
            <label>تكلفة الصيانة</label>
            <input
              disabled={submitting}
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 md:max-w-[400px]">
          <label>ملاحظات:</label>
          <textarea
            disabled={submitting}
            value={notes ?? ""}
            className="resize-none"
            onChange={(e) =>
              setNotes(e.target.value === "" ? "" : e.target.value)
            }
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-5 rounded bg-blue-500 p-2 font-bold text-white"
        >
          إضافة السجل
        </button>

        <p
          className={
            error
              ? "text-red-500"
              : submitting
                ? "text-neutral-600"
                : "text-green-500"
          }
        >
          {feedback}
        </p>
      </form>
      <div className="preview mt-10">
        <h1 className="mb-3 text-xl font-bold">البيانات:</h1>
        <table>
          <thead>
            <tr className="[&_th]:font-bold">
              {language === "english" ? (
                <>
                  <th>Date</th>
                  <th>Order Number</th>
                  <th>Vehicle Code</th>
                  <th>Vehicle Type</th>
                  <th>Licence Number</th>
                  <th>Model</th>
                  <th>Term Number</th>
                  {/* <th></th> */}
                  <th>Description</th>
                  <th>Statement</th>
                  <th>Unit</th>
                  <th>Quantity</th>
                  <th>Unit Cost</th>
                  <th>Repair Cost</th>
                  <th>Total Cost</th>
                </>
              ) : (
                <>
                  <th>التاريخ</th>
                  <th>رقم الطلب</th>
                  <th>كود المركبة</th>
                  <th>نوع المركبة</th>
                  <th>رقم اللوحة</th>
                  <th>سنة الإنتاج</th>
                  <th>كود الصيانة</th>
                  <th>البند</th>
                  {/* <th></th> */}
                  <th>البيان</th>
                  <th>الوحدة</th>
                  <th>كمية التوريد</th>
                  <th>تكلفة الوحدة</th>
                  <th>تكلفة الصيانة</th>
                  <th>إجمالي المبلغ</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            <tr>
              {language === "english" ? (
                <>
                  <td>{date !== "" && formatDateDDMMYYYY(date)}</td>
                  <td>{orderNum}</td>
                  <td>{selectVCode}</td>
                  <td>{vehicleData && vehicleData.vehicle_type_en}</td>
                  <td>{vehicleData && vehicleData.licence_number}</td>
                  <td dir="ltr">
                    {vehicleData && vehicleData.vehicle_model_en}
                  </td>
                  <td>{termsData && termsData.term_num}</td>
                  <td dir="ltr">{termsData && termsData.repair_desc_en}</td>
                  <td dir="ltr">
                    {termsData
                      ? `${termsData.term_num} ${termsData.repair_desc_en}`
                      : null}
                  </td>
                  <td>{unit}</td>
                  <td>{qty}</td>
                  <td>{unitCost}</td>
                  <td>{cost}</td>
                  <td>{totalCost > 0 ? totalCost : ""}</td>
                </>
              ) : (
                <>
                  <td>{date !== "" && formatDateDDMMYYYY(date)}</td>
                  <td>{orderNum}</td>
                  <td>{selectVCode}</td>
                  <td>{vehicleData && vehicleData.vehicle_type_ar}</td>
                  <td>{vehicleData && vehicleData.licence_number}</td>
                  <td>{vehicleData && vehicleData.vehicle_model_ar}</td>
                  <td>{termsData && termsData.term_num}</td>
                  <td>{termsData && termsData.repair_desc_ar}</td>
                  <td dir="ltr">
                    {termsData
                      ? `${termsData.term_num} ${termsData.repair_desc_ar}`
                      : null}
                  </td>
                  <td>{unit}</td>
                  <td>{qty}</td>
                  <td>{unitCost}</td>
                  <td>{cost}</td>
                  <td>{totalCost > 0 ? totalCost : ""}</td>
                </>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
