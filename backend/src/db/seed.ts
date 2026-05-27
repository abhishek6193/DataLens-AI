import { logInfo } from "../utils/logger";
import { db } from "./database";

// a seed wrapper to improve on the callback design, returns a promise
export function run(sql: string, params: unknown[] = []): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(sql, params, (err) => {
      if (err) {
        reject(err);
      } else {
        logInfo("Database seed executed");
        resolve();
      }
    });
  });
}
