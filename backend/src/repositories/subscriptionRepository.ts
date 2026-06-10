/* A repository layer to separate data access logic(querying database) from business logic */

import { query } from "../db/query";
import { SubscriptionRow } from "../types";

// query all subscriptions from database
export async function getSubscriptions() {
  return query<SubscriptionRow[]>("SELECT * FROM subscriptions");
}

// query subscriptions by month from database
export async function getSubscriptionsByMonth(month: string) {
  return query<SubscriptionRow[]>(
    "SELECT * FROM subscriptions WHERE month = ?",
    [month]
  );
}

// query subscriptions in paginated format
export async function getSubscriptionsPaginated(limit: number, offset: number) {
  return query<SubscriptionRow[]>(
    "SELECT * FROM subscriptions LIMIT ? OFFSET ?",
    [limit, offset]
  );
}
