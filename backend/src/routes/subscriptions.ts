import express from "express";
import { json as jsonBodyParser } from "body-parser";

// import utilities
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/apiResponse";
import { logInfo } from "../utils/logger";

import {
  addSubscription,
  getCountSubscriptions,
  getSubscriptionsService,
  modifySubscription,
  removeSubscription,
} from "../services/subscriptionsService";

import { validateSubscription } from "../middleware/validateSubscription";
import { validateMonth } from "../middleware/validateMonth";

const router = express.Router(); // express's router instance

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    // default route to return subscriptions data as json

    logInfo("Fetching subscriptions");

    // extract filtering params from request
    const month = req.query.month as string | undefined;
    const year = req.query.year as string | undefined;
    const minRevenue = req.query.minRevenue as number | undefined;
    const maxRevenue = req.query.maxRevenue as number | undefined;

    // extract sorting params from request
    const sortBy = req.query.sortBy as string | undefined;
    const sortOrder = req.query.sortOrder as string | undefined;

    // extract pagination params from request
    const page = req.query.page as number | undefined;
    const pageSize = req.query.pageSize as number | undefined;

    const subs = await getSubscriptionsService(
      page,
      pageSize,
      sortBy,
      sortOrder,
      month,
      year,
      minRevenue,
      maxRevenue
    );

    let subsCount: number | undefined;

    if (page) {
      const queryRes = await getCountSubscriptions(
        month,
        year,
        minRevenue,
        maxRevenue
      );
      subsCount = queryRes.find((res) => res)?.subsCount;
    }

    // return subscriptions in json response
    res.json(
      successResponse(
        subs,
        undefined,
        Number(page),
        Number(pageSize),
        subsCount
      )
    );
  })
);

router.post(
  "/",
  jsonBodyParser(),
  validateSubscription,
  asyncHandler(async (req, res, next) => {
    const newSubscription = req.body;
    await addSubscription(newSubscription);
    res.status(201).json(successResponse(newSubscription));
  })
);

router.put(
  "/:month",
  validateMonth,
  jsonBodyParser(),
  validateSubscription,
  asyncHandler(async (req, res, next) => {
    const subscriptionMonth = req.params.month as string;
    const subscription = req.body;
    const result = await modifySubscription(subscription, subscriptionMonth);
    res.status(200).json(successResponse(result));
  })
);

router.delete(
  "/:month",
  validateMonth,
  asyncHandler(async (req, res, next) => {
    const subscriptionMonth = req.params.month as string;
    const result = await removeSubscription(subscriptionMonth);
    res.status(200).json(successResponse(result));
  })
);

export default router;
