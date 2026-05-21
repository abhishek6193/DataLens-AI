import express from "express";

import { MetricsResponse } from "../types";

import { getMetrics } from "../services/metricsService";

import { validateMonth } from "../middleware/validateMonth";

import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/apiResponse";
import { logInfo } from "../utils/logger";

const router = express.Router(); // express's router instance

/* Register metrics routes */

// default route to return main metrics
router.get(
  "/",
  validateMonth,
  asyncHandler(async (req, res, next) => {
    // extract filters from query params
    const month = req.query.month as string | undefined;
    const section = req.query.section as keyof MetricsResponse | undefined;

    logInfo("Fetching metrics", {
      month,
      section,
    });

    const metrics = await getMetrics({ month, section });

    res.json(successResponse(metrics));
  })
);

export default router;
