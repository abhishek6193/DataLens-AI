import express from "express";

// import utilities
import { readCSV } from "../utils/loadCSV";
import { SubscriptionRow } from "../types";

const router = express.Router(); // express's router instance

router.get("/", async (req, res, next) => { // default route to return subscriptions data as json
  try {
    const subs: SubscriptionRow[] = await readCSV("../data/subscriptions.csv"); // get subscriptions data

    // return subscriptions in json response
    res.json(subs);
  } catch (error) {
    next(error);  // delegate to centralized error handler middleware
  }
});

export default router;
