import express from "express";
import { MetricsResponse } from "../types";
import { getMetrics } from "../services/metricsService";
import { validateMonth } from "../middleware/validateMonth";

const router = express.Router(); // express's router instance

/* Register metrics routes */

// default route to return main metrics
router.get("/", validateMonth, async (req, res, next) => {
  try {
    // extract filters from query params
    const month = req.query.month as string | undefined;
    const section = req.query.section as keyof MetricsResponse | undefined;

    const metrics = await getMetrics({ month, section });

    res.json(metrics);
  } catch (error) {
    next(error);  // delegate to centralized error handler middleware
  }
});

export default router;
