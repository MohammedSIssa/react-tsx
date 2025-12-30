import { useState, useEffect, useLayoutEffect } from "react";
import type { Log } from "../types/Log";

import ErrorPage from "./ErrorPage";
import LoadingSpinner from "../components/LoadingSpinner";

import { API } from "../variables/globals";
import { formatDateDDMMYYYY } from "../utils/formatData";

import { NavLink } from "react-router";

import ExportToExcel from "../components/ExportToExcelButton";

import { exportLogs } from "../variables/excel-export";

import DeleteButton from "../components/DeleteButton";

import { MdEdit } from "react-icons/md";
import { FaFilter } from "react-icons/fa";

import useLanguage from "../hooks/useLanguage";

import FilterPopup from "../components/FilterPopup";
import DateFilterPopup from "../components/DateFilterPopup";

import { FaPrint } from "react-icons/fa";

import { paginate, getTotalPages } from "../variables/pagination";

export default function Logs() {
  const [allLogs, setAllLogs] = useState<Log[] | null>(null);
  const [data, setData] = useState<Log[] | null>(null);
  const [shownData, setShownData] = useState<Log[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageLimit, setPageLimit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [showDateFilter, setShowDateFilter] = useState(false);

  const [showFilterPopup, setShowFilterPop] = useState(false);

  const [filterData, setFilterData] = useState<number[] | string[]>();
  const [filteringBy, setFilteringBy] = useState<keyof Log>("order_num");
  const [selectedFilterValue, setSelectedFilterValue] = useState<
    string | number
  >("");

  type DateFilter = {
    from: string | null; // YYYY-MM-DD
    to: string | null; // YYYY-MM-DD
  };

  const [dateFilter, setDateFilter] = useState<DateFilter>({
    from: null,
    to: null,
  });

  const [datesSet, setDatesSet] = useState<Set<string>>(new Set());

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
          setDatesSet(new Set(logs.map((log: Log) => log.log_date)));

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

  useLayoutEffect(() => {
    const costs = shownData?.map((log: Log) => log.total_cost) ?? [];
    const sum = costs.reduce(
      (accumulator: number, currentValue: number | null | undefined) =>
        accumulator + (currentValue ?? 0),
      0,
    );
    setTotalCost(sum);
  }, [shownData]);

  useEffect(() => {
    // pagination starts here.
    if (data !== null) {
      const show = paginate(data, pageNumber, pageLimit);
      const pages = getTotalPages(data, pageLimit);
      setTotalPages(pages);
      setShownData(show);
    }
  }, [pageNumber, data, pageLimit]);

  useEffect(() => {
    setPageNumber(1);
  }, [pageLimit]);

  const handleShowAllData = () => {
    setShownData(allLogs);
    setPageLimit(999);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorPage />;
  if (data)
    return (
      <div>
        <div className="hide-when-print p-5 pb-0 text-2xl font-bold">
          سجل الصيانة
        </div>
        <div className="hide-when-print flex items-center justify-center gap-2 pb-2">
          <ExportToExcel onClick={() => exportLogs(data ?? [])} />
          <button
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-500 p-2 text-white transition-all duration-200 hover:bg-blue-600"
            onClick={() => window.print()}
          >
            <FaPrint size={24} />
          </button>
        </div>
        <table
          dir={language === "english" ? "ltr" : "rtl"}
          className="mb-25 **:text-xs"
        >
          <thead className="bg-slate-800 font-bold text-white">
            <tr className="[&_button]:absolute [&_button]:top-1 [&_button]:left-1 [&_button]:cursor-pointer [&_button]:bg-slate-900 [&_button]:text-slate-300 [&_th]:relative [&_th]:border-r [&_th]:border-l [&_th]:border-slate-400 [&_th]:font-bold">
              {language === "english" ? (
                <>
                  <th>
                    Date{" "}
                    <button
                      onClick={() => {
                        setShowDateFilter(true);
                        setFilterData(Array.from(datesSet));
                      }}
                    >
                      <FaFilter size={10} />
                    </button>
                  </th>
                  <th>
                    Order Num{" "}
                    <button
                      onClick={() => {
                        setShowFilterPop(true);
                        setFilteringBy("order_num");
                        setFilterData(Array.from(orderNumbersSet));
                      }}
                    >
                      <FaFilter size={10} />
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
                      <FaFilter size={10} />
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
                      <FaFilter size={10} />
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
                      <FaFilter size={10} />
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
                      <FaFilter size={10} />
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
                      <FaFilter size={10} />
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
                      <FaFilter size={10} />
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
                  <th>
                    التاريخ{" "}
                    <button
                      onClick={() => {
                        setShowDateFilter(true);
                        setFilterData(Array.from(datesSet));
                      }}
                    >
                      <FaFilter size={10} />
                    </button>
                  </th>
                  <th>
                    رقم الطلب{" "}
                    <button
                      onClick={() => {
                        setShowFilterPop(true);
                        setFilteringBy("order_num");
                        setFilterData(Array.from(orderNumbersSet));
                      }}
                    >
                      <FaFilter size={10} />
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
                      <FaFilter size={10} />
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
                      <FaFilter size={10} />
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
                      <FaFilter size={10} />
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
                      <FaFilter size={10} />
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
                      <FaFilter size={10} />
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
                      <FaFilter size={10} />
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
          <tbody className="[&_tr]:odd:bg-neutral-100 [&_tr]:even:bg-neutral-200 [&_tr]:last-of-type:bg-white">
            {shownData?.map((log, idx) => (
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
                    className="rounded border-0 bg-slate-700 p-2 px-3 text-white"
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
        {showDateFilter && (
          <DateFilterPopup
            dates={(filterData ?? []).map(String)} // array of YYYY-MM-DD
            value={dateFilter}
            onChange={setDateFilter}
            onExit={() => {
              setShowDateFilter(false);
              setDateFilter({ from: null, to: null });
            }}
            onApply={() => {
              if (!allLogs) return;

              const filtered = allLogs.filter((log) => {
                if (
                  dateFilter.from &&
                  log.log_date &&
                  log.log_date < dateFilter.from
                ) {
                  return false;
                }

                if (
                  dateFilter.to &&
                  log.log_date &&
                  log.log_date > dateFilter.to
                ) {
                  return false;
                }

                return true;
              });

              setData(filtered);
              setShowDateFilter(false);
              setDateFilter({ from: null, to: null });
            }}
            onResetFilter={() => {
              setDateFilter({ from: null, to: null });
              setData(allLogs);
              setShowDateFilter(false);
            }}
          />
        )}
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

        <div className="hide-when-print fixed bottom-0 mt-4 flex h-20 w-full items-center justify-between bg-slate-800 p-2 px-10">
          <div>
            {totalPages > 1 &&
              Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPageNumber(i + 1)}
                  className={`h-fit cursor-pointer border-r border-l border-slate-800 px-3 py-1 shadow-sm transition-colors duration-200 ${
                    pageNumber === i + 1
                      ? "bg-slate-600 font-semibold text-white"
                      : "bg-gray-100 text-gray-800"
                  } `}
                >
                  {i + 1}
                </button>
              ))}
          </div>
          <div className="flex items-center gap-2">
            <label className="text-white">عدد السطور: </label>
            <select
              value={pageLimit}
              onChange={(e) => setPageLimit(Number(e.target.value))}
              className="w-30 bg-slate-700 p-2 text-white focus:outline-0 [&_option]:bg-slate-700"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
            <button
              onClick={handleShowAllData}
              className="cursor-pointer rounded bg-slate-600 p-1 px-4 text-white hover:bg-slate-700"
            >
              إظهار جميع البيانات
            </button>
          </div>
        </div>
      </div>
    );
}
