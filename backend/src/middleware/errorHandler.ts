import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";
import { errorResponse } from "../utils/apiResponse";

// middleware to centralize error handling logic
export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  const statusCode = err instanceof AppError ? err.statusCode : 500;

  res
    .status(statusCode)
    .json(errorResponse(err.message || "Internal Server Error"));
}
