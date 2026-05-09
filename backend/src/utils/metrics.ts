// calculate total revenue
export function calculateTotalRevenue(data: Array<object>) {
  return data.reduce((sum: number, row: any) => (sum = sum + row.revenue), 0);
}

// calculate churn rate
export function calculateChurnRate(data: Array<object>) {
  let totalChurn = 0;
  let totalSubs = 0;

  data.forEach((row: any) => {
    totalChurn = totalChurn + row.cancellations;
    totalSubs = totalSubs + row.activeSubscribers;
  });

  return Number((totalChurn / totalSubs) * 100).toFixed(2);
}

// calculate total subscriptions
export function calculateTotalSubscriptions(data: Array<object>) {
  return data.reduce(
    (sum: number, row: any) => (sum = sum + row.activeSubscribers),
    0
  );
}

// aggregate revenue by month
export function calculateMonthlyRevenue(data: Array<object>) {
  const monthlyRevenue: Record<string, number> = {};

  data.forEach((row: any) => {
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
    const prevMonthRevenue: any = data[i - 1]?.revenue;
    const currentMonthRevenue: any = data[i]?.revenue;
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
export function formatEngagementMetrics(data: any[]) {
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
export function formatPerformanceMetrics(data: any[]) {
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
  subscriptionsData: any[],
  performanceData: any[]
) {
  return subscriptionsData.map((subscription) => {
    const month = subscription.month;
    const performance = performanceData.find(
      (performanceRow) => performanceRow.month === month
    );

    return {
      month,
      cancellations: subscription.cancellations,
      bufferingRatePercent: performance.bufferingRatePercent ?? null,
      isHighRisk: performance.bufferingRatePercent > 4,
    };
  });
}
