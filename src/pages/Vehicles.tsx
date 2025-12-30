import { API } from "../variables/globals";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import type { Vehicle } from "../types/Vehicle";
import { MdEdit } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import ExportToExcel from "../components/ExportToExcelButton";

import LoadingSpinner from "../components/LoadingSpinner";
import ErrorPage from "./ErrorPage";

import DeleteButton from "../components/DeleteButton";

import useLanguage from "../hooks/useLanguage";

import FilterPopup from "../components/FilterPopup";
import { exportVehicles } from "../variables/excel-export";

import { FaCheckCircle } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { FaTimesCircle } from "react-icons/fa";
import { FaPrint } from "react-icons/fa";

import { paginate, getTotalPages } from "../variables/pagination";

export default function Vehicles() {
  const [allVehicles, setAllVehicles] = useState<Vehicle[] | null>(null);
  const [data, setData] = useState<Vehicle[] | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageLimit, setPageLimit] = useState<number>(15);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [shownData, setShownData] = useState<Vehicle[] | null>(null);

  useEffect(() => {
    // pagination starts here.
    if (data !== null) {
      const show = paginate(data, pageNumber, pageLimit);
      const pages = getTotalPages(data, pageLimit);
      setTotalPages(pages);
      setShownData(show as Vehicle[]);
    }
  }, [pageNumber, data, pageLimit]);

  useEffect(() => {
    setPageNumber(1);
  }, [pageLimit]);

  const [filterData, setFilterData] = useState<number[] | string[]>();
  const [filteringBy, setFilteringBy] = useState<keyof Vehicle>("vehicle_code");
  const [selectedFilterValue, setSelectedFilterValue] = useState<
    string | number
  >("");

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
  const [deptSet, setDeptSet] = useState<Set<string>>(new Set());
  const [stateSet, setStateSet] = useState<Set<string>>(new Set());

  const [showFilterPopup, setShowFilterPop] = useState(false);

  const { language } = useLanguage();

  function deleteEffect(id: number) {
    setData((d) => (d ? d.filter((ditem) => ditem.id !== id) : null));
  }

  useEffect(() => {
    async function getVehiclesData() {
      try {
        const res = await fetch(API + "/vehicles");
        if (res.ok) {
          const vehicles = await res.json();
          setData(vehicles);
          setAllVehicles(vehicles);

          setVehicleCodeSet(
            new Set(vehicles.map((v: Vehicle) => v.vehicle_code)),
          );
          setVehicleTypeArSet(
            new Set(vehicles.map((v: Vehicle) => v.vehicle_type_ar)),
          );
          setVehicleTypeEnSet(
            new Set(vehicles.map((v: Vehicle) => v.vehicle_type_en)),
          );
          setLicenceNumberSet(
            new Set(vehicles.map((v: Vehicle) => v.licence_number)),
          );
          setModelArSet(
            new Set(vehicles.map((v: Vehicle) => v.vehicle_model_ar)),
          );
          setModelEnSet(
            new Set(vehicles.map((v: Vehicle) => v.vehicle_model_en)),
          );
          setDeptSet(new Set(vehicles.map((v: Vehicle) => v.vehicle_dept)));
          setStateSet(new Set(vehicles.map((v: Vehicle) => v.vehicle_state)));
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getVehiclesData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorPage />;

  if (data)
    return (
      <div>
        <div className="hide-when-print p-5 pb-0 text-2xl font-bold">
          بيانات الآليات
        </div>
        <div className="hide-when-print flex items-center justify-center gap-2 pb-2">
          <ExportToExcel onClick={() => exportVehicles(data ?? [])} />
          <button
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-500 p-2 text-white transition-all duration-200 hover:bg-blue-600"
            onClick={() => window.print()}
          >
            <FaPrint size={24} />
          </button>
        </div>
        <table className="mb-25 **:text-xs">
          <thead className="bg-slate-800 font-bold text-white">
            <tr className="[&_button]:absolute [&_button]:top-1 [&_button]:left-1 [&_button]:cursor-pointer [&_button]:text-slate-300 [&_th]:relative [&_th]:border-r [&_th]:border-l [&_th]:border-slate-400 [&_th]:font-bold">
              {language === "english" ? (
                <>
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
                    Department{" "}
                    <button
                      onClick={() => {
                        setShowFilterPop(true);
                        setFilteringBy("vehicle_dept");
                        setFilterData(Array.from(deptSet));
                      }}
                    >
                      <FaFilter size={10} />
                    </button>
                  </th>
                  <th>
                    State{" "}
                    <button
                      onClick={() => {
                        setShowFilterPop(true);
                        setFilteringBy("vehicle_state");
                        setFilterData(Array.from(stateSet));
                      }}
                    >
                      <FaFilter size={10} />
                    </button>
                  </th>
                  <th>Notes</th>
                </>
              ) : (
                <>
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
                    {" "}
                    <button
                      onClick={() => {
                        setShowFilterPop(true);
                        setFilteringBy("vehicle_type_ar");
                        setFilterData(Array.from(vehicleTypeArSet));
                      }}
                    >
                      <FaFilter size={10} />
                    </button>
                    نوع المركبة
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
                    موديل{" "}
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
                    القسم{" "}
                    <button
                      onClick={() => {
                        setShowFilterPop(true);
                        setFilteringBy("vehicle_dept");
                        setFilterData(Array.from(deptSet));
                      }}
                    >
                      <FaFilter size={10} />
                    </button>
                  </th>
                  <th>
                    الحالة{" "}
                    <button
                      onClick={() => {
                        setShowFilterPop(true);
                        setFilteringBy("vehicle_state");
                        setFilterData(Array.from(stateSet));
                      }}
                    >
                      <FaFilter size={10} />
                    </button>
                  </th>
                  <th>ملاحظات</th>
                </>
              )}

              <th className="hide-when-print">اجراءات</th>
            </tr>
          </thead>
          <tbody className="[&_tr]:odd:bg-neutral-100 [&_tr]:even:bg-neutral-200 [&_tr]:last-of-type:bg-white">
            {shownData?.map((vehicle, idx) => (
              <tr key={idx}>
                {language === "english" ? (
                  <>
                    <td>{vehicle.vehicle_code}</td>
                    <td dir="ltr">{vehicle.vehicle_type_en}</td>
                    <td>{vehicle.licence_number}</td>
                    <td dir="ltr">{vehicle.vehicle_model_en}</td>
                  </>
                ) : (
                  <>
                    <td>{vehicle.vehicle_code}</td>
                    <td>{vehicle.vehicle_type_ar}</td>
                    <td>{vehicle.licence_number}</td>
                    <td>{vehicle.vehicle_model_ar}</td>
                    <td>{vehicle.vehicle_dept}</td>
                  </>
                )}
                <td>
                  <span
                    className={`flex h-fit w-fit items-center gap-2 rounded-xl p-2 px-4 ${vehicle.vehicle_state === "مدمرة" ? "bg-red-200 text-red-900" : vehicle.vehicle_state === "لا تعمل" ? "bg-yellow-200 text-yellow-900" : "bg-green-200 text-green-900"}`}
                  >
                    <span className="hide-when-print">
                      {vehicle.vehicle_state === "تعمل" ? (
                        <FaCheckCircle size={16} />
                      ) : vehicle.vehicle_state === "لا تعمل" ? (
                        <IoIosWarning size={18} />
                      ) : (
                        <FaTimesCircle size={16} />
                      )}
                    </span>
                    {vehicle.vehicle_state}
                  </span>
                </td>
                <td>{vehicle.notes ?? ""}</td>
                <td className="hide-when-print flex gap-1 p-1">
                  <NavLink
                    to={`/edit/vehicle`}
                    className="rounded border-0 bg-slate-700 p-2 px-3 text-white"
                    state={{ vehicle }}
                  >
                    <MdEdit size={16} />
                  </NavLink>
                  <DeleteButton
                    url={`${API}/vehicles/${vehicle.id}`}
                    id={vehicle.id ?? 0}
                    deleteEffect={deleteEffect}
                  />
                </td>
              </tr>
            ))}
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
              if (!allVehicles || !filteringBy || !selectedFilterValue) return;

              const filtered = allVehicles.filter(
                (d) =>
                  String(d[filteringBy as keyof Vehicle]) ===
                  String(selectedFilterValue),
              );

              setData(filtered);
              setShowFilterPop(false);
              setSelectedFilterValue("");
            }}
            // just reset data to all logs
            onResetFilter={() => {
              setShowFilterPop(false);
              setData(allVehicles);
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
              <option value={9999}>كل السطور</option>
            </select>
          </div>
        </div>
      </div>
    );
}
