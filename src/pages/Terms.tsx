import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import type { Term } from "../types/Term";
import { API } from "../variables/globals";
import ExportToExcel from "../components/ExportToExcelButton";

import LoadingSpinner from "../components/LoadingSpinner";
import ErrorPage from "./ErrorPage";
import { MdEdit } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import { FaPrint } from "react-icons/fa";
import DeleteButton from "../components/DeleteButton";

import useLanguage from "../hooks/useLanguage";

import FilterPopup from "../components/FilterPopup";
import { exportRepairTerms } from "../variables/excel-export";

import { paginate, getTotalPages } from "../variables/pagination";

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

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageLimit, setPageLimit] = useState<number>(15);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [shownData, setShownData] = useState<Term[] | null>(null);

  useEffect(() => {
    // pagination starts here.
    if (data !== null) {
      const show = paginate(data, pageNumber, pageLimit);
      const pages = getTotalPages(data, pageLimit);
      setTotalPages(pages);
      setShownData(show as Term[]);
    }
  }, [pageNumber, data, pageLimit]);

  useEffect(() => {
    setPageNumber(1);
  }, [pageLimit]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorPage />;
  return (
    <div>
      <div className="hide-when-print p-5 pb-2 text-2xl font-bold">
        بنود الصيانة
      </div>
      <div className="hide-when-print flex items-center gap-2 px-5 pb-2">
        <ExportToExcel onClick={() => exportRepairTerms(data ?? [])} />
        <button
          className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-500 p-2 text-white transition-all duration-200 hover:bg-blue-600"
          onClick={() => window.print()}
        >
          <FaPrint size={20} />
        </button>
      </div>
      <table className="mb-25 **:text-xs">
        <thead className="bg-slate-800 font-bold text-white">
          <tr className="[&_button]:absolute [&_button]:top-1 [&_button]:left-1 [&_button]:cursor-pointer [&_button]:text-slate-300 [&_th]:relative [&_th]:border-r [&_th]:border-l [&_th]:border-slate-400 [&_th]:font-bold">
            <th>
              {"#"}{" "}
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
                    <FaFilter size={10} />
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
                    <FaFilter size={10} />
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
                    <FaFilter size={10} />
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
                    <FaFilter size={10} />
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
        <tbody className="[&_tr]:odd:bg-neutral-100 [&_tr]:even:bg-neutral-200 [&_tr]:last-of-type:bg-white">
          {shownData &&
            shownData.map((term, idx) => (
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

                <td className="hide-when-print flex gap-1 p-1">
                  <NavLink
                    to={`/edit/term`}
                    className="rounded border-0 bg-slate-700 p-2 px-3 text-white"
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
