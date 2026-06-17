import express from "express";

// import utilities
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/apiResponse";
import { logInfo } from "../utils/logger";

import {
  getCountSubscriptions,
  getSubscriptionsService,
} from "../services/subscriptionsService";

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

export default router;
