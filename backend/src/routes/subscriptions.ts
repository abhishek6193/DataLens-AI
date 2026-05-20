import express from "express";

// import utilities
import { readCSV } from "../utils/loadCSV";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/apiResponse";

import { SubscriptionRow } from "../types";

const router = express.Router(); // express's router instance

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    // default route to return subscriptions data as json
    const subs: SubscriptionRow[] = await readCSV("../data/subscriptions.csv"); // get subscriptions data

    // return subscriptions in json response
    res.json(successResponse(subs));
  })
);

export default router;
