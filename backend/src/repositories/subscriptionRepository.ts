/* A repository layer to separate data access logic(querying database) from business logic */

import { query } from "../db/query";

// query all subscriptions from database
export async function getSubscriptions() {
  return query("SELECT * FROM subscriptions");
}

// query subscriptions by month from database
export async function getSubscriptionsByMonth(month: string) {
  return query("SELECT * FROM subscriptions WHERE month = ?", [month]);
}
