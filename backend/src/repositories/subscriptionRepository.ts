/* A repository layer to separate data access logic(querying database) from business logic */

import { query } from "../db/query";
import { run } from "../db/seed";
import { SubscriptionRow, SubscriptionsApiOptions } from "../types";

// query all subscriptions from database
export async function getSubscriptions(options: SubscriptionsApiOptions = {}) {
  const { limit, offset, sortBy, order, month, year, minRevenue, maxRevenue } =
    options;
  let subscriptionQuery = `SELECT * FROM subscriptions`;
  const params = [];
  if (month) {
    subscriptionQuery += ` WHERE month = ?`;
    params.push(month);
  }
  if (year) {
    subscriptionQuery += subscriptionQuery.includes("WHERE")
      ? ` AND month LIKE ?`
      : ` WHERE month LIKE ?`;
    params.push(`${year}%`);
  }
  if (minRevenue) {
    subscriptionQuery += subscriptionQuery.includes("WHERE")
      ? ` AND revenue >= ?`
      : ` WHERE revenue >= ?`;
    params.push(minRevenue);
  }
  if (maxRevenue) {
    subscriptionQuery += subscriptionQuery.includes("WHERE")
      ? ` AND revenue <= ?`
      : ` WHERE revenue <= ?`;
    params.push(maxRevenue);
  }
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

// query subscriptions count
export async function getSubscriptionsCount(
  filters: SubscriptionsApiOptions = {}
) {
  const { month, year, minRevenue, maxRevenue } = filters;
  let subscriptionCountQuery = `SELECT count(*) as subsCount FROM subscriptions`;
  const params = [];
  if (month) {
    subscriptionCountQuery += ` WHERE month = ?`;
    params.push(month);
  }
  if (year) {
    subscriptionCountQuery += subscriptionCountQuery.includes("WHERE")
      ? ` AND month LIKE ?`
      : ` WHERE month LIKE ?`;
    params.push(`${year}%`);
  }
  if (minRevenue) {
    subscriptionCountQuery += subscriptionCountQuery.includes("WHERE")
      ? ` AND revenue >= ?`
      : ` WHERE revenue >= ?`;
    params.push(minRevenue);
  }
  if (maxRevenue) {
    subscriptionCountQuery += subscriptionCountQuery.includes("WHERE")
      ? ` AND revenue <= ?`
      : ` WHERE revenue <= ?`;
    params.push(maxRevenue);
  }

  return query<{ subsCount: number }[]>(subscriptionCountQuery, params);
}

//create new subscriptions in database
export async function createSubscription(newSubscription: SubscriptionRow) {
  const {
    month,
    newSubscriptions,
    cancellations,
    activeSubscribers,
    revenue,
    arpu,
  } = newSubscription;
  return run(
    `
    INSERT INTO subscriptions (month, newSubscriptions, cancellations, activeSubscribers, revenue, arpu)
    VALUES (?, ?, ?, ?, ?, ?)
  `,
    [month, newSubscriptions, cancellations, activeSubscribers, revenue, arpu]
  );
}

//update existing subscription in database
export async function updateSubscription(subscription: SubscriptionRow) {
  const {
    month,
    newSubscriptions,
    cancellations,
    activeSubscribers,
    revenue,
    arpu,
  } = subscription;
  return run(
    `
      UPDATE subscriptions SET
      month = ?,
      newSubscriptions = ?,
      cancellations = ?,
      activeSubscribers = ?,
      revenue = ?,
      arpu = ?
      WHERE month = ?
  `,
    [
      month,
      newSubscriptions,
      cancellations,
      activeSubscribers,
      revenue,
      arpu,
      month,
    ]
  );
}

//delete existing subscription in database
export async function deleteSubscription(month: string) {
  return run(`DELETE FROM subscriptions WHERE month = ?`, [month]);
}
