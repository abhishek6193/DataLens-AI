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
  formatPerformanceMetrics,
  generateBufferingChurnInsights,
} from "../utils/metrics";

const router = express.Router(); // express's router instance

/* Register metrics routes */

// default route to return main metrics
router.get("/", async (req, res) => {
  try {
    // extract filters from query params
    const month = req.query.month as string |  undefined;
    const section = req.query.section as string | undefined;
  
    const subs: Array<object> = await readCSV("../data/subscriptions.csv"); // get subscriptions data
    const engagementData: Array<object> = await readCSV(
      "../data/engagement.csv"
    ); // get engagements data
    const performanceData: Array<object> = await readCSV(
      "../data/performance.csv"
    ); // get performance data

    // filter data based on the filter month
    const filteredSubs = month ? subs.filter((sub: any) => sub.month === month) : subs;
    const filteredEngagements = month ? engagementData.filter((engagement: any) => engagement.month === month) : engagementData;
    const filteredPerformance = month ? performanceData.filter((performance: any) => performance.month === month) : performanceData;

    const totalRevenue = calculateTotalRevenue(filteredSubs); // get total revenue metric
    const churnRate = calculateChurnRate(filteredSubs); // get churn rate metric
    const totalSubscriptions = calculateTotalSubscriptions(filteredSubs); // get total subscriptions metric
    const monthlyRevenue = calculateMonthlyRevenue(filteredSubs); // get revenue grouped by month
    const monthOverMonthGrowth = calculateMoMGrowth(monthlyRevenue); // get month over month growth trend from aggregated monthly revenue
    const engagementMetrics = formatEngagementMetrics(filteredEngagements); // format engagement metrics monthly
    const performanceMetrics = formatPerformanceMetrics(filteredPerformance); // format performance metrics monthly
    const bufferingChurnInsights = generateBufferingChurnInsights(
      filteredSubs,
      filteredPerformance
    ); // get churn insights from buffering data

    // prepare metrics as json response
    let resJson: any = {
      summary: { totalRevenue, churnRate, totalSubscriptions },
      trends: { monthlyRevenue, monthOverMonthGrowth },
      engagement: engagementMetrics,
      performance: performanceMetrics,
      insights: { bufferingVsChurn: bufferingChurnInsights },
      alerts: {
        highErrorMonths: filteredPerformance.filter(
          (performanceRow: any) => performanceRow.errorRatePercent > 1.7
        ),
      },
      meta: { generatedAt: new Date() },
    };

    // filter by the section value in query param
    resJson = section ? resJson[section] ?? { error: "Invalid section" } : resJson;

    res.json(resJson);
  } catch (error) {
    console.error(`Error fetching metrics data: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
