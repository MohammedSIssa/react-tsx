import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import type { Term } from "../types/Term";
import { API } from "../variables/globals";

import LoadingSpinner from "../components/LoadingSpinner";
import ErrorPage from "./ErrorPage";
import { MdEdit } from "react-icons/md";
import DeleteButton from "../components/DeleteButton";

export default function Terms() {
  const [data, setData] = useState<Term[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  function deleteEffect(id: number | string) {
    setData((d) => (d ? d.filter((i) => i.id !== id) : null));
  }

  useEffect(() => {
    async function getTermsData() {
      try {
        const res = await fetch(API + "/terms");
        if (res.ok) {
          const terms = await res.json();
          setData(terms);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getTermsData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorPage />;
  if (data && data.length)
    return (
      <table>
        <thead>
          <tr className="[&_th]:font-bold">
            <th>{"#"}</th>
            <th>نوع الصيانة</th>
            <th>نوع الصيانة - انجليزي</th>
            <th>وصف الصيانة</th>
            <th>وصف الصيانة - انجليزي</th>
            <th>الوحدة</th>
            <th>الكمية</th>
            <th>التكلفة {"($)"}</th>
            <th className="hide-when-print">اجراءات</th>
          </tr>
        </thead>
        <tbody>
          {data.map((term, idx) => (
            <tr key={idx}>
              <td>{term.term_num}</td>
              <td>{term.repair_type_ar}</td>
              <td>{term.repair_type_en}</td>
              <td>{term.repair_desc_ar}</td>
              <td>{term.repair_desc_en}</td>
              <td>{term.uom}</td>
              <td>{term.qty}</td>
              <td>{term.service_cost}</td>
              <td className="hide-when-print flex gap-1 border-0 border-l p-1">
                <NavLink
                  to={`/edit/term`}
                  className="rounded bg-blue-500 p-2 px-3 text-white"
                  state={{ term }}
                >
                  <MdEdit size={16} />
                </NavLink>
                <DeleteButton
                  url={`${API}/terms/${term.id}`}
                  id={term.id ?? 0}
                  deleteEffect={deleteEffect}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
}
