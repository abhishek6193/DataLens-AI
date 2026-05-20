import express from "express";

// import utilities
import { readCSV } from "../utils/loadCSV";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/apiResponse";

import { PerformanceRow } from "../types";

const router = express.Router(); // express's router instance

/* Register performances routes */
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    // default route to return performances data as json
    const performances: PerformanceRow[] = await readCSV(
      "../data/performance.csv"
    ); // get performances data

    // return performances in json response
    res.json(successResponse(performances));
  })
);

export default router;
