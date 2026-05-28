import { db } from "./database";
import { run } from "./seed";
import { EngagementRow, PerformanceRow, SubscriptionRow } from "../types";
import { readCSV } from "../utils/loadCSV";

// init db
db.serialize(() => {
  /* create tables if not exist */
  db.run(`
    CREATE TABLE IF NOT EXISTS subscriptions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        month TEXT UNIQUE,
        newSubscriptions INTEGER,
        cancellations INTEGER,
        activeSubscribers INTEGER,
        revenue INTEGER,
        arpu INTEGER
    )`);

  db.run(`
    CREATE TABLE IF NOT EXISTS engagement (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        month TEXT UNIQUE,
        MAU INTEGER,
        DAU INTEGER,
        totalWatchHours INTEGER,
        avgWatchTimePerUserMinutes INTEGER,
        completionRate INTEGER
    )`);

  db.run(`
    CREATE TABLE IF NOT EXISTS performance (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        month TEXT UNIQUE,
        avgLatencyMs INTEGER,
        errorRatePercent INTEGER,
        bufferingRatePercent INTEGER,
        apiRequestVolume INTEGER
    )`);

  /* seed data from csv files */
  (async () => {
    const subscriptions: SubscriptionRow[] = await readCSV(
      "../data/subscriptions.csv"
    );

    // testing seed wrapper
    for (const row of subscriptions) {
      await run(
        `INSERT OR IGNORE INTO subscriptions 
         (month, newSubscriptions, cancellations, activeSubscribers, revenue, arpu)
         values(?, ?, ?, ?, ?, ?)`,
        [
          row.month,
          row.newSubscriptions,
          row.cancellations,
          row.activeSubscribers,
          row.revenue,
          row.arpu,
        ]
      );
    }

    const engagements: EngagementRow[] = await readCSV(
      "../data/engagement.csv"
    );

    // testing seed wrapper
    for (const row of engagements) {
      await run(
        `INSERT OR IGNORE INTO engagement 
         (month, MAU, DAU, totalWatchHours, avgWatchTimePerUserMinutes, completionRate)
         values(?, ?, ?, ?, ?, ?)`,
        [
          row.month,
          row.MAU,
          row.DAU,
          row.totalWatchHours,
          row.avgWatchTimePerUserMinutes,
          row.completionRate,
        ]
      );
    }

    const performances: PerformanceRow[] = await readCSV(
      "../data/performance.csv"
    );

    // testing seed wrapper
    for (const row of performances) {
      await run(
        `INSERT OR IGNORE INTO performance 
         (month, avgLatencyMs, errorRatePercent, bufferingRatePercent, apiRequestVolume)
         values(?, ?, ?, ?, ?)`,
        [
          row.month,
          row.avgLatencyMs,
          row.errorRatePercent,
          row.bufferingRatePercent,
          row.apiRequestVolume,
        ]
      );
    }
  })();
});
