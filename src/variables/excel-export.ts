import { saveAs } from "file-saver";
import type { Log } from "../types/Log";
import type { Term } from "../types/Term";
import type { Vehicle } from "../types/Vehicle";
import { formatDateDDMMYYYY } from "../utils/formatData";

// Utility to convert JSON array to CSV
function jsonToCSV(
  data: Record<string, string | number | boolean | null | undefined>[],
  headers: string[],
) {
  const csv = [
    headers,
    ...data.map((row) => headers.map((h) => `"${row[h] ?? ""}"`)),
  ];
  return csv.map((row) => row.join(",")).join("\n");
}

export function exportLogs(logs: Log[]) {
  const exportData =
    logs?.map((log) => ({
      التاريخ: formatDateDDMMYYYY(log.log_date ?? ""),
      "رقم الطلب (AR)": log.order_num,
      "كود المركبة (AR)": log.vehicle_code,
      "نوع المركبة (AR)": log.vehicle_type_ar,
      "Vehicle Type (EN)": log.vehicle_type_en,
      "رقم اللوحة (AR)": log.licence_number,
      "سنة الإنتاج (AR)": log.vehicle_model_ar,
      "Model (EN)": log.vehicle_model_en,
      "كود الصيانة (AR)": log.term_num,
      "البند (AR)": log.repair_desc_ar,
      "Description (EN)": log.repair_desc_en,
      "البيان (AR)": `${log.term_num} ${log.repair_desc_ar}`,
      "Statement (EN)": `${log.term_num} ${log.repair_desc_en}`,
      الوحدة: log.unit,
      "كمية التوريد": log.qty,
      "تكلفة الوحدة": log.unit_cost,
      "تكلفة الصيانة": log.repair_cost,
      "إجمالي المبلغ": log.total_cost,
    })) ?? [];

  const headers = Object.keys(exportData[0] ?? {});
  const csvContent = jsonToCSV(exportData, headers);

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "logs.csv");
}

export function exportRepairTerms(terms: Term[]) {
  const exportData =
    terms?.map((term) => ({
      "Term Num (EN)": term.term_num,
      "رقم البند": term.term_num,
      "Repair Type (EN)": term.repair_type_en,
      "نوع الصيانة": term.repair_type_en,
      "Repair Desc (EN)": term.repair_desc_en,
      "وصف الصيانة": term.repair_desc_en,
      "Unit (EN)": term.uom,
      الوحدة: term.uom,
      "Quantity (EN)": term.qty,
      الكمية: term.qty,
      "Cost (EN)": term.service_cost,
      التكلفة: term.service_cost,
    })) ?? [];

  const headers = Object.keys(exportData[0] ?? {});
  const csvContent = jsonToCSV(exportData, headers);

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "terms.csv");
}

export function exportVehicles(vehicles: Vehicle[]) {
  const exportData =
    vehicles?.map((vehicle) => ({
      "كود المركبة": vehicle.vehicle_code,
      "نوع المركبة": vehicle.vehicle_type_ar,
      "Vehicle Type (EN)": vehicle.vehicle_type_en,
      "رقم اللوحة": vehicle.licence_number,
      "الموديل وسنة الانتاج": vehicle.vehicle_model_ar,
      "Model (EN)": vehicle.vehicle_model_en,
      القسم: vehicle.vehicle_dept,
      الحالة: vehicle.vehicle_state,
      ملاحظات: vehicle.notes,
    })) ?? [];

  const headers = Object.keys(exportData[0] ?? {});
  const csvContent = jsonToCSV(exportData, headers);

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "vehicles.csv");
}
