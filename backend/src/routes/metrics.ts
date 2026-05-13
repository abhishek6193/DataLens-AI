import express from "express";
import { MetricsResponse } from "../types";
import { getMetrics } from "../services/metricsService";
import { isValidMonth } from "../utils/validations";

const router = express.Router(); // express's router instance

/* Register metrics routes */

// default route to return main metrics
router.get("/", async (req, res) => {
  try {
    // extract filters from query params
    const month = req.query.month as string | undefined;
    const section = req.query.section as keyof MetricsResponse | undefined;

    if (month && !isValidMonth(month)) {
      return res.status(400).json({
        error: "Invlaid month format",
      });
    }

    const metrics = await getMetrics({ month, section });

    res.json(metrics);
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid section") {
      return res.status(400).json({
        error: error.message,
      });
    }
    console.error(`Error fetching metrics data: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
