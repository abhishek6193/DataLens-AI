/* A repository layer to separate analytics data access logic(querying database) from business logic */

import { query } from "../db/query";

// query monthly revenue from database
export function getMonthlyRevenue() {
  return query<{ month: string; revenue: number }[]>(
    `SELECT month, SUM(revenue) revenue FROM subscriptions GROUP BY month ORDER BY month`
  );
}

// query total revenue from database
export function getTotalRevenue() {
  return query<number>(`SELECT SUM(revenue) totalRevenue FROM subscriptions`);
}

// query total active subscribers from database
export function getTotalActiveSubscribers() {
  return query<number>(
    `SELECT SUM(activeSubscribers) totalActiveSubscribers FROM subscriptions`
  );
}

// query total churn from database
export function getTotalChurn() {
  return query<number>(
    `SELECT SUM(cancellations) totalChurn FROM subscriptions`
  );
}
