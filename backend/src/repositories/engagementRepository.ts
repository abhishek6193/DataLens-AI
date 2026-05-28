/* A repository layer to separate engagement data access logic(querying database) from business logic */

import { query } from "../db/query";
import { EngagementRow } from "../types";

// query all engagements from database
export async function getEngagements() {
  return query<EngagementRow[]>("SELECT * FROM engagement");
}

// query engagements by month from database
export async function getEngagementsByMonth(month: string) {
  return query<EngagementRow[]>("SELECT * FROM engagement WHERE month = ?", [
    month,
  ]);
}
