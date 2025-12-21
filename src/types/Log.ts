export type Log = {
  id?: number;
  log_date?: string | null;
  order_num?: string | null;
  vehicle_code?: number | null;
  vehicle_type_ar?: string | null;
  licence_number?: number | null;
  vehicle_model_en?: string | null;
  term_num?: string | null;
  repair_desc_ar?: string | null;
  repair_desc_en?: string | null;
  statement?: string | null;
  unit?: string | null;
  qty?: number | null;
  unit_cost?: number | null;
  repair_cost?: number | null;
  total_cost?: number | null;
  notes?: string | null;
};
