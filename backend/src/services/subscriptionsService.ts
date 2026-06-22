import {
  createSubscription,
  getSubscriptions,
  getSubscriptionsByMonth,
  getSubscriptionsCount,
  getSubscriptionsPaginated,
  getSubscriptionsSorted,
  updateSubscription,
} from "../repositories/subscriptionRepository";
import { SubscriptionRow, SubscriptionsApiOptions } from "../types";
import { AppError } from "../utils/appError";
import { isValidMonth } from "../utils/validations";

//service to get subscriptions
export async function getSubscriptionsService(
  page?: number,
  pageSize: number = 10,
  orderBy?: string,
  order?: string,
  month?: string,
  year?: string,
  minRevenue?: number,
  maxRevenue?: number
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
    options.order = order?.toUpperCase() ?? "ASC";
  }
  if (month) {
    options.month = month;
  }
  if (year) {
    options.year = year;
  }
  if (minRevenue) {
    options.minRevenue = minRevenue;
  }
  if (maxRevenue) {
    options.maxRevenue = maxRevenue;
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

//service to get subscriptions count
export async function getCountSubscriptions(
  month?: string,
  year?: string,
  minRevenue?: number,
  maxRevenue?: number
) {
  const options: SubscriptionsApiOptions = {};
  if (month) {
    options.month = month;
  }
  if (year) {
    options.year = year;
  }
  if (minRevenue) {
    options.minRevenue = minRevenue;
  }
  if (maxRevenue) {
    options.maxRevenue = maxRevenue;
  }

  return await getSubscriptionsCount(options);
}

//service to get subscriptions by month
export async function getSubscriptionsByMonthService(month: string) {
  if (isValidMonth(month)) {
    return await getSubscriptionsByMonth(month);
  }
}

//service to add new subscription
export async function addSubscription(newSubscription: SubscriptionRow) {
  const existingSubscription = await getSubscriptionsByMonthService(
    newSubscription.month
  );

  if (existingSubscription && existingSubscription.length > 0)
    throw new AppError("month already exists", 409);
  return await createSubscription(newSubscription);
}

//service to update an existing susbscription
export async function modifySubscription(
  subscription: SubscriptionRow,
  subscriptionMonth: string
) {
  const existingSubscription = await getSubscriptionsByMonthService(
    subscriptionMonth
  );

  if (!existingSubscription || existingSubscription.length === 0)
    throw new AppError("provided subscription doesn't exist", 404);

  const existingSubscriptionObj = existingSubscription[0] as SubscriptionRow;

  Object.assign(existingSubscriptionObj, {
    ...subscription,
    month: subscriptionMonth,
  });

  return await updateSubscription(existingSubscriptionObj);
}
