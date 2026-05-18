import { NextFunction, Request, Response } from "express";

// utility to wrap async code, to reduce boilerplate in routes
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return function (req: Request, res: Response, next: NextFunction) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
