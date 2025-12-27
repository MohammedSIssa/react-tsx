import { useState, useEffect } from "react";
import type { Log } from "../types/Log";

import ErrorPage from "./ErrorPage";
import LoadingSpinner from "../components/LoadingSpinner";

import { API } from "../variables/globals";
import { formatDateDDMMYYYY } from "../utils/formatData";

import { NavLink } from "react-router";

import DeleteButton from "../components/DeleteButton";

import { MdEdit } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import { BsDatabaseX } from "react-icons/bs";

import useLanguage from "../hooks/useLanguage";

import FilterPopup from "../components/FilterPopup";

export default function Logs() {
  const [allLogs, setAllLogs] = useState<Log[] | null>(null);
  const [data, setData] = useState<Log[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [showFilterPopup, setShowFilterPop] = useState(false);

  const [filterData, setFilterData] = useState<number[] | string[]>();
  const [filteringBy, setFilteringBy] = useState<keyof Log>("order_num");
  const [selectedFilterValue, setSelectedFilterValue] = useState<
    string | number
  >("");

  // Filters sets state
  const [orderNumbersSet, setOrderNumbersSet] = useState<Set<string>>(
    new Set(),
  );
  const [vehicleCodeSet, setVehicleCodeSet] = useState<Set<number>>(new Set());
  const [vehicleTypeArSet, setVehicleTypeArSet] = useState<Set<string>>(
    new Set(),
  );
  const [vehicleTypeEnSet, setVehicleTypeEnSet] = useState<Set<string>>(
    new Set(),
  );
  const [licenceNumberSet, setLicenceNumberSet] = useState<Set<number>>(
    new Set(),
  );
  const [modelArSet, setModelArSet] = useState<Set<string>>(new Set());
  const [modelEnSet, setModelEnSet] = useState<Set<string>>(new Set());
  const [termNumSet, setTermNumSet] = useState<Set<string>>(new Set());
  const [repairDescArSet, setRepairDescArSet] = useState<Set<string>>(
    new Set(),
  );

  const [repairDescEnSet, setRepairDescEnSet] = useState<Set<string>>(
    new Set(),
  );

  const [totalCost, setTotalCost] = useState(0);

  const { language } = useLanguage();

  function deleteEffect(id: number) {
    setData((d) => (d ? d.filter((i) => i.id !== id) : null));
  }

  useEffect(() => {
    async function getLogs() {
      try {
        const res = await fetch(`${API}/logs`);

        if (res.ok) {
          const logs = await res.json();
          setData(logs);
          setAllLogs(logs);
          // Setting filters options
          setOrderNumbersSet(new Set(logs.map((log: Log) => log.order_num)));
          setVehicleCodeSet(new Set(logs.map((log: Log) => log.vehicle_code)));
          setVehicleTypeArSet(
            new Set(logs.map((log: Log) => log.vehicle_type_ar)),
          );
          setVehicleTypeEnSet(
            new Set(logs.map((log: Log) => log.vehicle_type_en)),
          );

          setLicenceNumberSet(
            new Set(logs.map((log: Log) => log.licence_number)),
          );
          setModelArSet(new Set(logs.map((log: Log) => log.vehicle_model_ar)));
          setModelEnSet(new Set(logs.map((log: Log) => log.vehicle_model_en)));
          setTermNumSet(new Set(logs.map((log: Log) => log.term_num)));
          setRepairDescArSet(
            new Set(logs.map((log: Log) => log.repair_desc_ar)),
          );
          setRepairDescEnSet(
            new Set(logs.map((log: Log) => log.repair_desc_en)),
          );
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getLogs();
  }, []);

  useEffect(() => {
    const costs = data?.map((log: Log) => log.total_cost) ?? [];
    const sum = costs.reduce(
      (accumulator: number, currentValue: number | null | undefined) =>
        accumulator + (currentValue ?? 0),
      0,
    );
    setTotalCost(sum);
  }, [data]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorPage />;
  if (data?.length === 0)
    return (
      <div className="flex h-[300px] items-center justify-center text-black/20">
        <BsDatabaseX size={100} />
      </div>
    );
  if (data && data.length)
    return (
      <div>
        <table dir={language === "english" ? "ltr" : "rtl"}>
          <thead>
            <tr className="[&_button]:absolute [&_button]:-top-2 [&_button]:left-0 [&_button]:cursor-pointer [&_button]:bg-white [&_th]:relative [&_th]:font-bold">
              {language === "english" ? (
                <>
                  <th>Date</th>
                  <th>
                    Order Num{" "}
                    <button
                      onClick={() => {
                        setShowFilterPop(true);
                        setFilteringBy("order_num");
                        setFilterData(Array.from(orderNumbersSet));
                      }}
                    >
                      <FaFilter />
                    </button>
                  </th>
                  <th>
                    Vehicle Code{" "}
                    <button
                      onClick={() => {
                        setShowFilterPop(true);
                        setFilteringBy("vehicle_code");
                        setFilterData(Array.from(vehicleCodeSet));
                      }}
                    >
                      <FaFilter />
                    </button>
                  </th>
                  <th>
                    Vehicle Type{" "}
                    <button
                      onClick={() => {
                        setShowFilterPop(true);
                        setFilteringBy("vehicle_type_en");
                        setFilterData(Array.from(vehicleTypeEnSet));
                      }}
                    >
                      <FaFilter />
                    </button>
                  </th>
                  <th>
                    Licence Number{" "}
                    <button
                      onClick={() => {
                        setShowFilterPop(true);
                        setFilteringBy("licence_number");
                        setFilterData(Array.from(licenceNumberSet));
                      }}
                    >
                      <FaFilter />
                    </button>
                  </th>
                  <th>
                    Model{" "}
                    <button
                      onClick={() => {
                        setShowFilterPop(true);
                        setFilteringBy("vehicle_model_en");
                        setFilterData(Array.from(modelEnSet));
                      }}
                    >
                      <FaFilter />
                    </button>
                  </th>
                  <th>
                    Repair Code{" "}
                    <button
                      onClick={() => {
                        setShowFilterPop(true);
                        setFilteringBy("term_num");
                        setFilterData(Array.from(termNumSet));
                      }}
                    >
                      <FaFilter />
                    </button>
                  </th>
                  <th>
                    Description{" "}
                    <button
                      onClick={() => {
                        setShowFilterPop(true);
                        setFilteringBy("repair_desc_en");
                        setFilterData(Array.from(repairDescEnSet));
                      }}
                    >
                      <FaFilter />
                    </button>
                  </th>
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
                  <th>
                    رقم الطلب{" "}
                    <button
                      onClick={() => {
                        setShowFilterPop(true);
                        setFilteringBy("order_num");
                        setFilterData(Array.from(orderNumbersSet));
                      }}
                    >
                      <FaFilter />
                    </button>
                  </th>
                  <th>
                    كود المركبة{" "}
                    <button
                      onClick={() => {
                        setShowFilterPop(true);
                        setFilteringBy("vehicle_code");
                        setFilterData(Array.from(vehicleCodeSet));
                      }}
                    >
                      <FaFilter />
                    </button>
                  </th>
                  <th>
                    نوع المركبة{" "}
                    <button
                      onClick={() => {
                        setShowFilterPop(true);
                        setFilteringBy("vehicle_type_ar");
                        setFilterData(Array.from(vehicleTypeArSet));
                      }}
                    >
                      <FaFilter />
                    </button>
                  </th>
                  <th>
                    رقم اللوحة{" "}
                    <button
                      onClick={() => {
                        setShowFilterPop(true);
                        setFilteringBy("licence_number");
                        setFilterData(Array.from(licenceNumberSet));
                      }}
                    >
                      <FaFilter />
                    </button>
                  </th>
                  <th>
                    سنة الإنتاج{" "}
                    <button
                      onClick={() => {
                        setShowFilterPop(true);
                        setFilteringBy("vehicle_model_ar");
                        setFilterData(Array.from(modelArSet));
                      }}
                    >
                      <FaFilter />
                    </button>
                  </th>
                  <th>
                    كود الصيانة{" "}
                    <button
                      onClick={() => {
                        setShowFilterPop(true);
                        setFilteringBy("term_num");
                        setFilterData(Array.from(termNumSet));
                      }}
                    >
                      <FaFilter />
                    </button>
                  </th>
                  <th>
                    البند{" "}
                    <button
                      onClick={() => {
                        setShowFilterPop(true);
                        setFilteringBy("repair_desc_ar");
                        setFilterData(Array.from(repairDescArSet));
                      }}
                    >
                      <FaFilter />
                    </button>
                  </th>
                  <th>البيان</th>
                  <th>الوحدة</th>
                  <th>كمية التوريد</th>
                  <th>تكلفة الوحدة</th>
                  <th>تكلفة الصيانة</th>
                  <th>إجمالي المبلغ</th>
                </>
              )}
              <th className="hide-when-print">اجراءات</th>
            </tr>
          </thead>
          <tbody>
            {data.map((log, idx) => (
              <tr key={idx}>
                <td>{formatDateDDMMYYYY(log.log_date ?? "")}</td>
                {language === "english" ? (
                  <>
                    <td>{log.order_num}</td>
                    <td>{log.vehicle_code}</td>
                    <td>{log.vehicle_type_en}</td>
                    <td>{log.licence_number}</td>
                    <td>{log.vehicle_model_en}</td>
                    <td>{log.term_num}</td>
                    <td dir="ltr">{log.repair_desc_en}</td>
                    <td dir="ltr">
                      {log.term_num} {log.repair_desc_en}
                    </td>
                  </>
                ) : (
                  <>
                    <td>{log.order_num}</td>
                    <td>{log.vehicle_code}</td>
                    <td>{log.vehicle_type_ar}</td>
                    <td>{log.licence_number}</td>
                    <td>{log.vehicle_model_ar}</td>
                    <td>{log.term_num}</td>
                    <td>{log.repair_desc_ar}</td>
                    <td>
                      {log.term_num} {log.repair_desc_ar}
                    </td>
                  </>
                )}
                <td>{log.unit}</td>
                <td>{log.qty}</td>
                <td>{log.unit_cost}</td>
                <td>{log.repair_cost}</td>
                <td>{log.total_cost}</td>
                <td className="hide-when-print flex gap-1 border-0 p-1">
                  <NavLink
                    to={`/edit/log`}
                    className="rounded border-0 bg-blue-500 p-2 px-3 text-white"
                    state={{ log }}
                  >
                    <MdEdit size={16} />
                  </NavLink>
                  <DeleteButton
                    url={`${API}/logs/${log.id}`}
                    id={log.id ?? 0}
                    deleteEffect={deleteEffect}
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td className="border-0"></td>
              <td className="border-0"></td>
              <td className="border-0"></td>
              <td className="border-0"></td>
              <td className="border-0"></td>
              <td className="border-0"></td>
              <td className="border-0"></td>
              <td className="border-0"></td>
              <td className="border-0"></td>
              <td className="border-0"></td>
              <td className="border-0"></td>
              <td className="border-0"></td>
              <td className="border-0"></td>
              <td>{totalCost}</td>
              <td className="border-0"></td>
            </tr>
          </tbody>
        </table>
        {showFilterPopup && (
          <FilterPopup
            data={filterData ?? []}
            selectedFilterValue={selectedFilterValue}
            setSelectedFilterValue={setSelectedFilterValue}
            onExit={() => setShowFilterPop(false)}
            onFilter={(e) => {
              e.preventDefault();
              if (!allLogs || !filteringBy || !selectedFilterValue) return;

              const filtered = allLogs.filter(
                (d) =>
                  String(d[filteringBy as keyof Log]) ===
                  String(selectedFilterValue),
              );

              setData(filtered);
              setShowFilterPop(false);
              setSelectedFilterValue("");
            }}
            // just reset data to all logs
            onResetFilter={() => {
              setShowFilterPop(false);
              setData(allLogs);
            }}
          />
        )}
      </div>
    );
}
