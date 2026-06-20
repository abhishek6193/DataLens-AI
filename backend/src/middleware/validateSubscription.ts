import { NextFunction, Request, Response } from "express";
import { SubscriptionRow } from "../types";
import { invalidSubscriptionError } from "../utils/validations";
import { AppError } from "../utils/appError";

// middleware function to validate subscription sent in an incoming request
export function validateSubscription(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const subscription = req.body as SubscriptionRow | undefined;
  const newSubscriptionError = invalidSubscriptionError(subscription);
  if (newSubscriptionError !== "")
    return next(new AppError(newSubscriptionError, 400));
  next();
}
