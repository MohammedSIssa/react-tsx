import { API } from "../variables/globals";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import type { Vehicle } from "../types/Vehicle";
import { MdEdit } from "react-icons/md";

import LoadingSpinner from "../components/LoadingSpinner";
import ErrorPage from "./ErrorPage";

import DeleteButton from "../components/DeleteButton";

import useLanguage from "../hooks/useLanguage";

export default function Vehicles() {
  const [data, setData] = useState<Vehicle[] | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

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
  if (data && data.length)
    return (
      <table>
        <thead>
          <tr className="[&_th]:font-bold">
            {language === "english" ? (
              <>
                <th>Vehicle Code</th>
                <th>Vehicle Type</th>
                <th>Licence Number</th>
                <th>Model</th>
                <th>Department</th>
                <th>State</th>
                <th>Notes</th>
              </>
            ) : (
              <>
                <th>كود المركبة</th>
                <th>نوع المركبة</th>
                <th>رقم اللوحة</th>
                <th>موديل</th>
                <th>القسم</th>
                <th>الحالة</th>
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
    );
}
