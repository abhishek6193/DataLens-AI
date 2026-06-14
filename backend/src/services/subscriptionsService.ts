import {
  getSubscriptions,
  getSubscriptionsPaginated,
  getSubscriptionsSorted,
} from "../repositories/subscriptionRepository";
import { SubscriptionsApiOptions } from "../types";

//service to get subscriptions
export async function getSubscriptionsService(
  page?: number,
  pageSize: number = 10,
  orderBy?: string,
  order?: string
) {
  const options: SubscriptionsApiOptions = {};
  if (page) {
    options.limit = pageSize;
    options.offset = (page - 1) * pageSize;
  }
  if (orderBy) {
    const allowedColums = [
      "month",
      "activeSubscribers",
      "revenue",
      "arpu",
      "cancellations",
      "newSubscriptions",
    ];
    const allowedOrders = ["ASC", "DESC"];
    if (!allowedColums.includes(orderBy)) {
      throw new Error(`Invalid sort column: ${orderBy}`);
    }
    if (order && !allowedOrders.includes(order.toUpperCase())) {
      throw new Error(`Invalid order: ${order}`);
    }
    options.sortBy = orderBy;
    console.log("check order", order?.toUpperCase())
    options.order = order?.toUpperCase() ?? "ASC";
  }

  return await getSubscriptions(options);
}

//service to get paginated subscriptions
export async function getPaginatedSubscriptions(
  page: number,
  pageSize: number = 10
) {
  const offset = (page - 1) * pageSize;
  return await getSubscriptionsPaginated(pageSize, offset);
}

//service to get sorted subscriptions
export async function getSortedSubscriptions(orderBy: string, order?: string) {
  const allowedColums = [
    "month",
    "activeSubscribers",
    "revenue",
    "arpu",
    "cancellations",
    "newSubscriptions",
  ];
  const allowedOrders = ["ASC", "DESC"];
  if (!allowedColums.includes(orderBy)) {
    throw new Error(`Invalid sort column: ${orderBy}`);
  }
  if (order && !allowedOrders.includes(order)) {
    throw new Error(`Invalid order: ${order}`);
  }
  return await getSubscriptionsSorted(orderBy, order ?? "asc");
}
