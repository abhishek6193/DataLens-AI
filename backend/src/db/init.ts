import { db } from "./database";
import { query } from "./query";

import { logError, logInfo } from "../utils/logger";

//testing query wrapper
async function testQuery() {
  const rows = await query("SELECT * FROM subscriptions WHERE month = ?", [
    "2022-02",
  ]);
  console.log(rows);
}
async function queryOne(id: number) {
  const rows = await query("SELECT * FROM subscriptions WHERE id = ?", [id]);
  console.log(rows);
}

// init db
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS subscriptions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        month TEXT,
        revenue INTEGER,
        activeSubscribers INTEGER
    )`);
  queryOne(4);
  // db.run(`
  //   INSERT INTO subscriptions
  //   (month, revenue, activeSubscribers)
  //   VALUES
  //   ('2022-02', 2380000, 34000)
  //   `);
  // db.all("SELECT * from subscriptions", [], (err, rows) => {
  //   if (err) {
  //     logError("Error reading subscriptions from database", {
  //       err,
  //     });
  //   } else {
  //     logInfo("Read subscriptions from database", rows);
  //   }
  // });
  // db.all("SELECT * from subscriptions where month = ?", ["2022-02"], (err, rows) => {
  //   if (err) {
  //     logError("Error reading filtered subscriptions from database", {
  //       err,
  //     });
  //   } else {
  //     logInfo("Read filtered subscriptions from database", rows);
  //   }
  // });
  // db.all("SELECT * from subscriptions ORDER BY revenue DESC", [], (err, rows) => {
  //   if (err) {
  //     logError("Error reading sorted subscriptions from database", {
  //       err,
  //     });
  //   } else {
  //     logInfo("Read sorted subscriptions from database", rows);
  //   }
  // });
});
