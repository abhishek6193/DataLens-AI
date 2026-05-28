/* A repository layer to separate performance data access logic(querying database) from business logic */

import { query } from "../db/query";
import { PerformanceRow } from "../types";

// query all performances from database
export async function getPerformances() {
  return query<PerformanceRow[]>("SELECT * FROM performance");
}

// query performances by month from database
export async function getPerformancesByMonth(month: string) {
  return query<PerformanceRow[]>("SELECT * FROM performance WHERE month = ?", [
    month,
  ]);
}
