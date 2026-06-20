import { SubscriptionRow } from "../types";

// validate if it's a valid month
export function isValidMonth(month: string) {
  return /^\d{4}-\d{2}$/.test(month);
}

// check if the given subscription is invalid, return error message 
export function invalidSubscriptionError(subscription: SubscriptionRow | undefined): string {
  if (!subscription) return "Request body missing";

  const missingFields: string[] = [];
  const invalidFields: string[] = [];

  if (!subscription.month) {
    missingFields.push("month");
  } else if (
    typeof subscription.month !== "string" ||
    !isValidMonth(subscription.month)
  ) {
    invalidFields.push("month");
  }

  if (!subscription.revenue) {
    missingFields.push("revenue");
  } else if (typeof subscription.revenue !== "number") {
    invalidFields.push("revenue");
  }

  if (!subscription.newSubscriptions) {
    missingFields.push("newSubscriptions");
  } else if (typeof subscription.newSubscriptions !== "number") {
    invalidFields.push("newSubscriptions");
  }

  if (!subscription.activeSubscribers) {
    missingFields.push("activeSubscribers");
  } else if (typeof subscription.activeSubscribers !== "number") {
    invalidFields.push("activeSubscribers");
  }

  if (!subscription.cancellations) {
    missingFields.push("cancellations");
  } else if (typeof subscription.cancellations !== "number") {
    invalidFields.push("cancellations");
  }

  if (!subscription.arpu) {
    missingFields.push("arpu");
  } else if (typeof subscription.arpu !== "number") {
    invalidFields.push("arpu");
  }

  let errorMessage = "";
  if (missingFields.length > 0) {
    errorMessage += "Missing required fields:";
    missingFields.forEach((field) => {
      errorMessage += ` ${field}`;
    });
  }
  if (invalidFields.length > 0) {
    if (errorMessage !== "") errorMessage += ". ";
    errorMessage += "Invalid fields:";
    invalidFields.forEach((field) => {
      errorMessage += ` ${field}`;
    });
  }

  return errorMessage;
}
