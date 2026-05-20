import express from "express";

// import utilities
import { readCSV } from "../utils/loadCSV";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/apiResponse";

import { EngagementRow } from "../types";

const router = express.Router(); // express's router instance

/* Register engagements routes */
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    // default route to return engagements data as json

    const engagements: EngagementRow[] = await readCSV(
      "../data/engagement.csv"
    ); // get engagenments data

    // return engagements in json response
    res.json(successResponse(engagements));
  })
);

export default router;
