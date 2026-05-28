import express from "express";

import { SubscriptionRow } from "../types";

// import utilities
import { readCSV } from "../utils/loadCSV";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/apiResponse";
import { logInfo } from "../utils/logger";

import { getSubscriptions } from "../repositories/subscriptionRepository";

const router = express.Router(); // express's router instance

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    // default route to return subscriptions data as json

    logInfo("Fetching subscriptions");

    const subs = await getSubscriptions();

    // return subscriptions in json response
    res.json(successResponse(subs));
  })
);

export default router;
