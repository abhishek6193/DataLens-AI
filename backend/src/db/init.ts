import { db } from "./database";

import {
  getSubscriptions,
  getSubscriptionsByMonth,
} from "../repositories/subscriptionRepository";
import { run } from "./seed";

import { SubscriptionRow } from "../types";

import { logInfo } from "../utils/logger";
import { readCSV } from "../utils/loadCSV";

// init db
db.serialize(() => {
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

    // testing repository layer
    const allSubscriptions = await getSubscriptions();
    const subscriptionsByMonth = await getSubscriptionsByMonth("2022-02");
    logInfo("Read all subscriptions", allSubscriptions);
    logInfo("Read subscriptions by month", subscriptionsByMonth);
  })();
});
