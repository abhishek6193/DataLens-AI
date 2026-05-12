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

import {
  EngagementRow,
  PerformanceRow,
  SubscriptionRow,
  MetricsResponse,
  MetricsFilters,
} from "../types";

// service to get metrics based on filters provided
export async function getMetrics(filters: MetricsFilters) {
  const { month, section } = filters;

  const subs: SubscriptionRow[] = await readCSV("../data/subscriptions.csv"); // get subscriptions data
  const engagementData: EngagementRow[] = await readCSV(
    "../data/engagement.csv"
  ); // get engagements data
  const performanceData: PerformanceRow[] = await readCSV(
    "../data/performance.csv"
  ); // get performance data

  // filter data based on the filter month
  const filteredSubs = month
    ? subs.filter((sub: SubscriptionRow) => sub.month === month)
    : subs;
  const filteredEngagements = month
    ? engagementData.filter(
        (engagement: EngagementRow) => engagement.month === month
      )
    : engagementData;
  const filteredPerformance = month
    ? performanceData.filter(
        (performance: PerformanceRow) => performance.month === month
      )
    : performanceData;

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
  let resJson: MetricsResponse | MetricsResponse[keyof MetricsResponse] = {
    summary: { totalRevenue, churnRate, totalSubscriptions },
    trends: { monthlyRevenue, monthOverMonthGrowth },
    engagement: engagementMetrics,
    performance: performanceMetrics,
    insights: { bufferingVsChurn: bufferingChurnInsights },
    alerts: {
      highErrorMonths: filteredPerformance.filter(
        (performanceRow: PerformanceRow) =>
          performanceRow.errorRatePercent > 1.7
      ),
    },
    meta: { generatedAt: new Date() },
  };

  // filter by the section value in query param
  resJson = section
    ? resJson[section] ?? { error: "Invalid section" }
    : resJson;

  return resJson;
}
