/* A repository layer to separate data access logic(querying database) from business logic */

import { query } from "../db/query";
import { SubscriptionRow, SubscriptionsApiOptions } from "../types";

// query all subscriptions from database
export async function getSubscriptions(
  options: SubscriptionsApiOptions = {}
) {
  const { limit, offset, sortBy, order } = options;
  let subscriptionQuery = `SELECT * FROM subscriptions`;
  const params = [];
  if (sortBy) {
    subscriptionQuery += ` ORDER BY ${sortBy} ${order}`;
  }
  if (limit) {
    subscriptionQuery += ` LIMIT ? OFFSET ?`;
    params.push(limit);
    params.push(offset);
  }
  return query<SubscriptionRow[]>(subscriptionQuery, params);
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

// query subscriptions in sorted format
export async function getSubscriptionsSorted(sortBy: string, order?: string) {
  return query<SubscriptionRow[]>(
    `SELECT * FROM subscriptions ORDER BY ${sortBy} ${order}`
  );
}
