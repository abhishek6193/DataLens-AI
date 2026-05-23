import sqlite3 from "sqlite3";
import { logError, logInfo } from "../utils/logger";

// connect to sqlite database
export const db = new sqlite3.Database("./src/db/analytics.db", (err) => {
  if (err) {
    logError("Failed to connect to db", {
      errorMessage: err.message,
    });
  } else {
    logInfo("Connected to sqlite database");
  }
});
