import { db } from "./database";
import { run } from "./seed";
import { EngagementRow, PerformanceRow, SubscriptionRow } from "../types";
import { readCSV } from "../utils/loadCSV";
import { getReportsWithSubscriptionData } from "../repositories/reportsRepository";

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

  db.run(`
    CREATE TABLE IF NOT EXISTS analytics_reports (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        month TEXT NOT NULL,
        reportType TEXT NOT NULL,
        generatedAt TEXT NOT NULL,
        subscriptionMonth TEXT NOT NULL
    )`);

  /* create indices if not exist */
  db.run(`
    CREATE INDEX IF NOT EXISTS idx_subscriptions_month
    ON subscriptions (month)
    `);

  db.run(`
    CREATE INDEX IF NOT EXISTS idx_engagement_month
    ON engagement (month)
    `);

  db.run(`
    CREATE INDEX IF NOT EXISTS idx_performance_month
    ON performance (month)
    `);

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

    // seed some test data to analytics reports table
    // await run(`INSERT OR IGNORE INTO analytics_reports (month, reportType, generatedAt, subscriptionMonth) values("january", "revenue", "2026-06-05", "2022-01")`);
    // await run(`INSERT OR IGNORE INTO analytics_reports (month, reportType, generatedAt, subscriptionMonth) values("january", "churn", "2026-06-05", "2022-01")`);
    // await run(`INSERT OR IGNORE INTO analytics_reports (month, reportType, generatedAt, subscriptionMonth) values("february", "revenue", "2026-06-05", "2022-02")`);

    // test join query fetching reports based on subscription month
    // await getReportsWithSubscriptionData();
  })();
});
