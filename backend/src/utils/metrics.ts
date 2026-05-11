import { EngagementRow, PerformanceRow, SubscriptionRow } from "../types";

// calculate total revenue
export function calculateTotalRevenue(data: SubscriptionRow[]) {
  return data.reduce(
    (sum: number, row: SubscriptionRow) => (sum = sum + row.revenue),
    0
  );
}

// calculate churn rate
export function calculateChurnRate(data: SubscriptionRow[]) {
  let totalChurn = 0;
  let totalSubs = 0;

  data.forEach((row: SubscriptionRow) => {
    totalChurn = totalChurn + row.cancellations;
    totalSubs = totalSubs + row.activeSubscribers;
  });

  return Number((totalChurn / totalSubs) * 100).toFixed(2);
}

// calculate total subscriptions
export function calculateTotalSubscriptions(data: SubscriptionRow[]) {
  return data.reduce(
    (sum: number, row: SubscriptionRow) => (sum = sum + row.activeSubscribers),
    0
  );
}

// aggregate revenue by month
export function calculateMonthlyRevenue(data: SubscriptionRow[]) {
  const monthlyRevenue: Record<string, number> = {};

  data.forEach((row: SubscriptionRow) => {
    const month = row.month;
    if (!monthlyRevenue[month]) {
      monthlyRevenue[month] = 0;
    }
    monthlyRevenue[month] = monthlyRevenue[month] + row.revenue;
  });

  // converting object to array for easier handling in frontend
  return Object.entries(monthlyRevenue).map(([month, revenue]) => {
    return {
      month,
      revenue,
    };
  });
}

// calculate month over month growth
export function calculateMoMGrowth(data: { month: string; revenue: number }[]) {
  const growth = []; // array to return mom growth for each month

  for (let i = 1; i < data.length; i++) {
    const prevMonthRevenue: number | undefined = data[i - 1]?.revenue;
    const currentMonthRevenue: number = data[i]?.revenue ?? 0;
    let change;
    if (!prevMonthRevenue) change = 0;
    else {
      change =
        ((currentMonthRevenue - prevMonthRevenue) / prevMonthRevenue) * 100; // formula for MoM growth
    }
    growth.push({
      month: data[i]?.month,
      growth: Number(change.toFixed(2)),
    });
  }

  return growth;
}

// format engagement metrics
export function formatEngagementMetrics(data: EngagementRow[]) {
  return {
    monthlyActiveUsers: data.map((row) => {
      return {
        month: row.month,
        MAU: row.MAU,
      };
    }),
    dailyActiveUsers: data.map((row) => {
      return {
        month: row.month,
        DAU: row.DAU,
      };
    }),
    completionRates: data.map((row) => {
      return {
        month: row.month,
        completionRate: row.completionRate,
      };
    }),
    watchHours: data.map((row) => {
      return {
        month: row.month,
        totalWatchHours: row.totalWatchHours,
      };
    }),
  };
}

// format performance metrics
export function formatPerformanceMetrics(data: PerformanceRow[]) {
  return {
    latency: data.map((row) => {
      return {
        month: row.month,
        avgLatencyMs: row.avgLatencyMs,
      };
    }),
    errors: data.map((row) => {
      return {
        month: row.month,
        errorRatePercent: row.errorRatePercent,
      };
    }),
    buffering: data.map((row) => {
      return {
        month: row.month,
        bufferingRatePercent: row.bufferingRatePercent,
      };
    }),
    apiTraffic: data.map((row) => {
      return {
        month: row.month,
        apiRequestVolume: row.apiRequestVolume,
      };
    }),
  };
}

// generate churn insights from buffering data
export function generateBufferingChurnInsights(
  subscriptionsData: SubscriptionRow[],
  performanceData: PerformanceRow[]
) {
  return subscriptionsData.map((subscription) => {
    const month = subscription.month;
    const performance: PerformanceRow | undefined = performanceData.find(
      (performanceRow) => performanceRow.month === month
    );

    return {
      month,
      cancellations: subscription.cancellations,
      bufferingRatePercent: performance?.bufferingRatePercent ?? null,
      isHighRisk: performance?.bufferingRatePercent
        ? performance.bufferingRatePercent > 4
        : false,
    };
  });
}
