import { NextFunction, Request, Response } from "express";
import { isValidMonth } from "../utils/validations";

// middleware function to validate month in the incoming request
export function validateMonth(req: Request, res: Response, next: NextFunction) {
  const month = req.query.month as string | undefined;
  if (month && !isValidMonth(month)) {
    return res.status(400).json({
      error: "Invlaid month format",
    });
  }
  next();
}
