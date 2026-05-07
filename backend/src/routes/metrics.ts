import express from "express";

// import utilities
import { readCSV } from "../utils/loadCSV";
import {
  calculateChurnRate,
  calculateMoMGrowth,
  calculateMonthlyRevenue,
  calculateTotalRevenue,
  calculateTotalSubscriptions,
  formatEngagementMetrics,
} from "../utils/metrics";

const router = express.Router(); // express's router instance

/* Register metrics routes */
router.get("/", async (req, res) => {
  // default route to return main metrics
  try {
    const subs: Array<object> = await readCSV("../data/subscriptions.csv"); // get subscriptions data
    const engagementData: Array<object> = await readCSV("../data/engagement.csv"); // get engagements data

    const totalRevenue = calculateTotalRevenue(subs); // get total revenue metric
    const churnRate = calculateChurnRate(subs); // get churn rate metric
    const totalSubscriptions = calculateTotalSubscriptions(subs); // get total subscriptions metric
    const monthlyRevenue = calculateMonthlyRevenue(subs); // get revenue grouped by month
    const monthOverMonthGrowth = calculateMoMGrowth(monthlyRevenue); // get month over month growth trend from aggregated monthly revenue
    const engagementMetrics = formatEngagementMetrics(engagementData); // format engagement metrics monthly

    // return metrics in a json response
    res.json({
      summary: { totalRevenue, churnRate, totalSubscriptions },
      trends: { monthlyRevenue, monthOverMonthGrowth },
      engagementMetrics,
      meta: { generatedAt: new Date() },
    });
  } catch (error) {
    console.error(`Error fetching metrics data: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
