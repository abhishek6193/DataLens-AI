import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";
import { errorResponse } from "../utils/apiResponse";
import { logError } from "../utils/logger";

// middleware to centralize error handling logic
export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logError("Unhandled application error", {
    error: err instanceof Error ? err.message : "Unknown error",
  });

  const statusCode = err instanceof AppError ? err.statusCode : 500;

  res
    .status(statusCode)
    .json(errorResponse(err.message || "Internal Server Error"));
}
