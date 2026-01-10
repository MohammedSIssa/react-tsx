// Function to get paginated data
import type { Log } from "../types/Log";
import type { Term } from "../types/Term";
import type { Vehicle } from "../types/Vehicle";

export function paginate(
  array: Log[] | Term[] | Vehicle[],
  pageNumber: number,
  pageSize: number,
) {
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return array.slice(startIndex, endIndex);
}

// Function to get all data (for printing)
export function getAllData(array: Log[] | Vehicle[] | Term[]) {
  return [...array]; // return a shallow copy of the array
}

// Calculate total pages based on array length and page size
export function getTotalPages(
  array: Log[] | Vehicle[] | Term[],
  pageSize: number,
) {
  return Math.ceil(array.length / pageSize);
}
