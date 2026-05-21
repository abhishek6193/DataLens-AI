import express from "express";

import { PerformanceRow } from "../types";

// import utilities
import { readCSV } from "../utils/loadCSV";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/apiResponse";
import { logInfo } from "../utils/logger";

const router = express.Router(); // express's router instance

/* Register performances routes */
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    // default route to return performances data as json

    logInfo("Fetching performance");

    const performances: PerformanceRow[] = await readCSV(
      "../data/performance.csv"
    ); // get performances data

    // return performances in json response
    res.json(successResponse(performances));
  })
);

export default router;
