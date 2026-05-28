import express from "express";

import { EngagementRow } from "../types";

// import utilities
import { readCSV } from "../utils/loadCSV";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/apiResponse";
import { logInfo } from "../utils/logger";

import { getEngagements } from "../repositories/engagementRepository";

const router = express.Router(); // express's router instance

/* Register engagements routes */
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    // default route to return engagements data as json

    logInfo("Fetching engagements");

    // const engagements: EngagementRow[] = await readCSV(
    //   "../data/engagement.csv"
    // ); // get engagenments data

    const engagements = await getEngagements();

    // return engagements in json response
    res.json(successResponse(engagements));
  })
);

export default router;
