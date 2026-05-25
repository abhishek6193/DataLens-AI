import { logInfo } from "../utils/logger";
import { db } from "./database";

// a query wrapper to improve on the callback design, returns a promise
export function query<T>(sql: string, params: unknown[] = []): Promise<T[]> {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        logInfo("Database query executed");
        resolve(rows as T[]);
      }
    });
  });
}
