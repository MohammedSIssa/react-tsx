export function formatDateDDMMYYYY(date: string) {
  const [y, m, d] = date.split("-");
  return `${d}/${m}/${y}`;
}

export function toDDMMYYYY(date: string) {
  const [y, m, d] = date.split("-");
  return `${d}/${m}/${y}`;
}

export function toYYYYMMDD(date: string) {
  const [day, month, year] = date.split("/");

  return [year, month.padStart(2, "0"), day.padStart(2, "0")].join("-");
}

export function todayYYYYMMDD() {
  return new Date().toISOString().slice(0, 10);
}

export function daysAgoYYYYMMDD(days: number) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}
