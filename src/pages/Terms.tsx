import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import type { Term } from "../types/Term";
import { API } from "../variables/globals";

import LoadingSpinner from "../components/LoadingSpinner";
import ErrorPage from "./ErrorPage";
import { MdEdit } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import DeleteButton from "../components/DeleteButton";

import useLanguage from "../hooks/useLanguage";

import FilterPopup from "../components/FilterPopup";
// import { BsDatabaseX } from "react-icons/bs";

export default function Terms() {
  const [allTerms, setAllTerms] = useState<Term[] | null>(null);
  const [data, setData] = useState<Term[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showFilterPopup, setShowFilterPop] = useState(false);

  const [filterData, setFilterData] = useState<number[] | string[]>();
  const [filteringBy, setFilteringBy] = useState<keyof Term>("term_num");
  const [selectedFilterValue, setSelectedFilterValue] = useState<
    string | number
  >("");

  const [termNumSet, setTermNumSet] = useState<Set<number>>(new Set());
  const [repairTypeArSet, setRepairTypeArSet] = useState<Set<string>>(
    new Set(),
  );
  const [repairTypeEnSet, setRepairTypeEnSet] = useState<Set<string>>(
    new Set(),
  );
  const [repairDescArSet, setRepairDescArSet] = useState<Set<string>>(
    new Set(),
  );
  const [repairDescEnSet, setRepairDescEnSet] = useState<Set<string>>(
    new Set(),
  );
  const { language } = useLanguage();

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
          setAllTerms(terms);

          setTermNumSet(new Set(terms.map((t: Term) => t.term_num)));
          setRepairTypeArSet(new Set(terms.map((t: Term) => t.repair_type_ar)));
          setRepairTypeEnSet(new Set(terms.map((t: Term) => t.repair_type_en)));
          setRepairDescArSet(new Set(terms.map((t: Term) => t.repair_desc_ar)));
          setRepairDescEnSet(new Set(terms.map((t: Term) => t.repair_desc_en)));
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
  // if (data?.length === 0)
  //   return (
  //     <div className="flex h-[300px] items-center justify-center text-black/20">
  //       <BsDatabaseX size={100} />
  //     </div>
  //   );
  if (data)
    return (
      <div>
        <table>
          <thead>
            <tr className="[&_button]:absolute [&_button]:-top-2 [&_button]:left-0 [&_button]:cursor-pointer [&_button]:bg-white [&_th]:relative [&_th]:font-bold">
              <th>
                {"#"}{" "}
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
              {language === "english" ? (
                <>
                  <th>
                    Repair Type{" "}
                    <button
                      onClick={() => {
                        setShowFilterPop(true);
                        setFilteringBy("repair_type_en");
                        setFilterData(Array.from(repairTypeEnSet));
                      }}
                    >
                      <FaFilter />
                    </button>
                  </th>
                  <th>
                    Repair Description{" "}
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
                  <th>Unit</th>
                  <th>Quantity</th>
                  <th dir="ltr">Cost {"($)"}</th>
                </>
              ) : (
                <>
                  <th>
                    نوع الصيانة{" "}
                    <button
                      onClick={() => {
                        setShowFilterPop(true);
                        setFilteringBy("repair_type_ar");
                        setFilterData(Array.from(repairTypeArSet));
                      }}
                    >
                      <FaFilter />
                    </button>
                  </th>
                  <th>
                    وصف الصيانة{" "}
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
                  <th>الوحدة</th>
                  <th>الكمية</th>
                  <th>التكلفة {"($)"}</th>
                </>
              )}
              <th className="hide-when-print">اجراءات</th>
            </tr>
          </thead>
          <tbody>
            {data.map((term, idx) => (
              <tr key={idx}>
                {language === "english" ? (
                  <>
                    <td>{term.term_num}</td>
                    <td>{term.repair_type_en}</td>
                    <td>{term.repair_desc_en}</td>
                    <td>{term.uom}</td>
                    <td>{term.qty}</td>
                  </>
                ) : (
                  <>
                    <td>{term.term_num}</td>
                    <td>{term.repair_type_ar}</td>
                    <td>{term.repair_desc_ar}</td>
                    <td>{term.uom}</td>
                    <td>{term.qty}</td>
                  </>
                )}
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
        {showFilterPopup && (
          <FilterPopup
            data={filterData ?? []}
            selectedFilterValue={selectedFilterValue}
            setSelectedFilterValue={setSelectedFilterValue}
            onExit={() => setShowFilterPop(false)}
            onFilter={(e) => {
              e.preventDefault();
              if (!allTerms || !filteringBy || !selectedFilterValue) return;

              const filtered = allTerms.filter(
                (d) =>
                  String(d[filteringBy as keyof Term]) ===
                  String(selectedFilterValue),
              );

              setData(filtered);
              setShowFilterPop(false);
              setSelectedFilterValue("");
            }}
            // just reset data to all logs
            onResetFilter={() => {
              setShowFilterPop(false);
              setData(allTerms);
            }}
          />
        )}
      </div>
    );
}
