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
import { filterByMonth } from "../utils/filter";
import { AppError } from "../utils/appError";

import {
  getSubscriptions,
  getSubscriptionsByMonth,
} from "../repositories/subscriptionRepository";
import {
  getEngagements,
  getEngagementsByMonth,
} from "../repositories/engagementRepository";
import {
  getPerformances,
  getPerformancesByMonth,
} from "../repositories/performanceRepository";

// import types
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

  // const subs: SubscriptionRow[] = await readCSV("../data/subscriptions.csv"); // get subscriptions data
  // const engagementData: EngagementRow[] = await readCSV(
  //   "../data/engagement.csv"
  // ); // get engagements data
  // const performanceData: PerformanceRow[] = await readCSV(
  //   "../data/performance.csv"
  // ); // get performance data

  const subs = await getSubscriptions();
  const engagementData = await getEngagements();
  const performanceData = await getPerformances();

  // filter data based on the filter month
  const filteredSubs = month ? await getSubscriptionsByMonth(month) : subs;
  const filteredEngagements = month
    ? await getEngagementsByMonth(month)
    : engagementData;
  const filteredPerformance = month
    ? await getPerformancesByMonth(month)
    : performanceData;

  const totalRevenue = await calculateTotalRevenue(filteredSubs); // get total revenue metric
  const churnRate = await calculateChurnRate(filteredSubs); // get churn rate metric
  const totalSubscriptions = await calculateTotalSubscriptions(filteredSubs); // get total subscriptions metric
  const monthlyRevenue = await calculateMonthlyRevenue(filteredSubs); // get revenue grouped by month
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

  if (section && !(section in resJson)) {
    throw new AppError("Invalid section", 400);
  }

  // filter by the section value in query param
  resJson = section ? resJson[section] : resJson;

  return resJson;
}
