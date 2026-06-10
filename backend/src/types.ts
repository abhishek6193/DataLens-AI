export interface SubscriptionRow {
  month: string;
  newSubscriptions: number;
  cancellations: number;
  activeSubscribers: number;
  revenue: number;
  arpu: number;
}

export interface EngagementRow {
  month: string;
  MAU: number;
  DAU: number;
  totalWatchHours: number;
  avgWatchTimePerUserMinutes: number;
  completionRate: number;
}

export interface PerformanceRow {
  month: string;
  avgLatencyMs: number;
  errorRatePercent: number;
  bufferingRatePercent: number;
  apiRequestVolume: number;
}

export interface MetricsResponse {
  summary: {
    totalRevenue: number;
    churnRate: string;
    totalSubscriptions: number;
  };
  trends: {
    monthlyRevenue: { month: string; revenue: number }[];
    monthOverMonthGrowth: { month: string | undefined; growth: number }[];
  };
  engagement: {
    monthlyActiveUsers: {
      month: string;
      MAU: number;
    }[];
    dailyActiveUsers: {
      month: string;
      DAU: number;
    }[];
    completionRates: {
      month: string;
      completionRate: number;
    }[];
    watchHours: {
      month: string;
      totalWatchHours: number;
    }[];
  };
  performance: {
    latency: {
      month: string;
      avgLatencyMs: number;
    }[];
    errors: {
      month: string;
      errorRatePercent: number;
    }[];
    buffering: {
      month: string;
      bufferingRatePercent: number;
    }[];
    apiTraffic: {
      month: string;
      apiRequestVolume: number;
    }[];
  };
  insights: {
    bufferingVsChurn: {
      month: string;
      cancellations: number;
      bufferingRatePercent: number | null;
      isHighRisk: boolean;
    }[];
  };
  alerts: {
    highErrorMonths: PerformanceRow[];
  };
  meta: { generatedAt: Date };
}

export interface MetricsFilters {
  month?: string | undefined;
  section?: keyof MetricsResponse | undefined;
}

export interface SuccessResponse {
  success: boolean;
  data: unknown;
  message: string;
  timestamp: string;
  page?: number;
  pageSize?: number;
}

export interface ErrorResponse {
  success: boolean;
  error: unknown;
  message: string;
  timestamp: string;
}
