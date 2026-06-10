import express from "express";

import { SubscriptionRow } from "../types";

// import utilities
import { readCSV } from "../utils/loadCSV";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/apiResponse";
import { logInfo } from "../utils/logger";

import { getSubscriptions } from "../repositories/subscriptionRepository";
import { getPaginatedSubscriptions } from "../services/subscriptionsService";

const router = express.Router(); // express's router instance

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    // default route to return subscriptions data as json

    logInfo("Fetching subscriptions");

    // extract pagination params from request
    const page = req.query.page as number | undefined;
    const pageSize = (req.query.pageSize as number | undefined) || 10; // default page size is 10

    const subs = page
      ? await getPaginatedSubscriptions(page, pageSize)
      : await getSubscriptions();

    // return subscriptions in json response
    res.json(successResponse(subs, undefined, page, pageSize));
  })
);

export default router;
