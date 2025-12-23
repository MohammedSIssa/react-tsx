import { useState, useEffect } from "react";
import type { Log } from "../types/Log";

import ErrorPage from "./ErrorPage";
import LoadingSpinner from "../components/LoadingSpinner";

import { API } from "../variables/globals";
import { formatDateDDMMYYYY } from "../utils/formatData";

import { NavLink } from "react-router";

import DeleteButton from "../components/DeleteButton";

import { MdEdit } from "react-icons/md";

import useLanguage from "../hooks/useLanguage";

export default function Logs() {
  const [data, setData] = useState<Log[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
          const costs = logs.map((log: Log) => log.total_cost);
          const sum = costs.reduce(
            (accumulator: number, currentValue: number) =>
              accumulator + currentValue,
            0,
          );
          setTotalCost(sum);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getLogs();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorPage />;
  if (data && data.length)
    return (
      <table dir={language === "english" ? "ltr" : "rtl"}>
        <thead>
          <tr className="[&_th]:font-bold">
            {language === "english" ? (
              <>
                <th>Date</th>
                <th>Order Num</th>
                <th>Vehicle Code</th>
                <th>Vehicle Type</th>
                <th>Licence Number</th>
                <th>Model</th>
                <th>Repair Code</th>
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
                  <td dir="ltr">{log.vehicle_model_ar}</td>
                  <td>{log.term_num}</td>
                  <td>{log.repair_desc_ar}</td>
                  <td dir="ltr">
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
    );
}
