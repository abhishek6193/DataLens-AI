import express from "express";

// import utilities
import { readCSV } from "../utils/loadCSV";
import {
  calculateChurnRate,
  calculateTotalRevenue,
  calculateTotalSubscriptions,
} from "../utils/metrics";

const router = express.Router(); // express's router instance

/* Register metrics routes */
router.get("/", async (req, res) => { // default route to return main metrics
  try {
    const subs: Array<object> = await readCSV("../data/subscriptions.csv"); // get subscriptions data

    const totalRevenue = calculateTotalRevenue(subs); // get total revenue metric
    const churnRate = calculateChurnRate(subs); // get churn rate metric
    const totalSubscriptions = calculateTotalSubscriptions(subs); // get total subscriptions metric

    // return metrics in a json response
    res.json({
      totalRevenue,
      churnRate,
      totalSubscriptions,
    });
  } catch (error) {
    console.error(`Error fetching metrics data: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
