import { NextFunction, Request, Response } from "express";

// log method and url for all incoming requests
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
}
