import { NextFunction, Request, Response } from "express";
import { isValidMonth } from "../utils/validations";
import { AppError } from "../utils/appError";

// middleware function to validate month in the incoming request
export function validateMonth(req: Request, res: Response, next: NextFunction) {
  const month = req.query.month as string | undefined;
  if (month && !isValidMonth(month)) {
    return next(new AppError("Invalid month format", 400)); // delegate to centralized error handler middleware
  }
  next();
}
