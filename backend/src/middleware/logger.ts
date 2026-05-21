import { NextFunction, Request, Response } from "express";
import { logInfo } from "../utils/logger";

// log method and url for all incoming requests
export function logger(req: Request, res: Response, next: NextFunction) {
  logInfo("Incoming Request", {
    method: req.method,
    url: req.url,
  });
  next();
}
