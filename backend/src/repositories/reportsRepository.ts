/* A repository layer to separate the data access logic to fetch reports from business logic */

import { query } from "../db/query";

//query reports and subscription data based on subscription month
export function getReportsWithSubscriptionData() {
  return query<{
    reportType: string;
    generatedAt: string;
    month: string;
    revenue: string;
  }>(`
        SELECT r.reportType, r.generatedAt, s.month, s.revenue
        FROM analytics_reports r INNER JOIN subscriptions s
        ON r.subscriptionMonth = s.month
    `);
}
