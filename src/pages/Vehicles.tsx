import { API } from "../variables/globals";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import type { Vehicle } from "../types/Vehicle";
import { MdEdit } from "react-icons/md";
import { FaFilter } from "react-icons/fa";

import LoadingSpinner from "../components/LoadingSpinner";
import ErrorPage from "./ErrorPage";

import DeleteButton from "../components/DeleteButton";

import useLanguage from "../hooks/useLanguage";

import FilterPopup from "../components/FilterPopup";
import { BsDatabaseX } from "react-icons/bs";

export default function Vehicles() {
  const [allVehicles, setAllVehicles] = useState<Vehicle[] | null>(null);
  const [data, setData] = useState<Vehicle[] | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

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
  if (data?.length === 0)
    return (
      <div className="flex h-[300px] items-center justify-center text-black/20">
        <BsDatabaseX size={100} />
      </div>
    );
  if (data && data.length)
    return (
      <div>
        <table>
          <thead>
            <tr className="[&_button]:absolute [&_button]:-top-2 [&_button]:left-0 [&_button]:cursor-pointer [&_button]:bg-white [&_th]:relative [&_th]:font-bold">
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
                    Department{" "}
                    <button
                      onClick={() => {
                        setShowFilterPop(true);
                        setFilteringBy("vehicle_dept");
                        setFilterData(Array.from(deptSet));
                      }}
                    >
                      <FaFilter />
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
                      <FaFilter />
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
                      <FaFilter />
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
                      <FaFilter />
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
                      <FaFilter />
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
                      <FaFilter />
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
                      <FaFilter />
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
                      <FaFilter />
                    </button>
                  </th>
                  <th>ملاحظات</th>
                </>
              )}

              <th className="hide-when-print">اجراءات</th>
            </tr>
          </thead>
          <tbody>
            {data.map((vehicle, idx) => (
              <tr key={idx}>
                {language === "english" ? (
                  <>
                    <td>{vehicle.vehicle_code}</td>
                    <td dir="ltr">{vehicle.vehicle_type_en}</td>
                    <td>{vehicle.licence_number}</td>
                    <td dir="ltr">{vehicle.vehicle_model_en}</td>
                    <td>{vehicle.vehicle_dept}</td>
                    <td
                      className={`${vehicle.vehicle_state === "مدمرة" ? "bg-red-200" : vehicle.vehicle_state === "لا تعمل" ? "bg-yellow-200" : "bg-green-200"}`}
                    >
                      {vehicle.vehicle_state}
                    </td>
                    <td>{vehicle.notes ?? ""}</td>
                  </>
                ) : (
                  <>
                    <td>{vehicle.vehicle_code}</td>
                    <td>{vehicle.vehicle_type_ar}</td>
                    <td>{vehicle.licence_number}</td>
                    <td>{vehicle.vehicle_model_ar}</td>
                    <td>{vehicle.vehicle_dept}</td>
                    <td
                      className={`${vehicle.vehicle_state === "مدمرة" ? "bg-red-200" : vehicle.vehicle_state === "لا تعمل" ? "bg-yellow-200" : "bg-green-200"}`}
                    >
                      {vehicle.vehicle_state}
                    </td>
                    <td>{vehicle.notes ?? ""}</td>
                  </>
                )}
                <td className="hide-when-print flex gap-1 border-0 border-l p-1">
                  <NavLink
                    to={`/edit/vehicle`}
                    className="rounded bg-blue-500 p-2 px-3 text-white"
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
      </div>
    );
}
