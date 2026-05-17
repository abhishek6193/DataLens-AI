import express from "express";

// import utilities
import { readCSV } from "../utils/loadCSV";
import { EngagementRow } from "../types";

const router = express.Router(); // express's router instance

/* Register engagements routes */
router.get("/", async (req, res, next) => {
  // default route to return engagements data as json
  try {
    const engagements: EngagementRow[] = await readCSV(
      "../data/engagement.csv"
    ); // get engagenments data

    // return engagements in json response
    res.json(engagements);
  } catch (error) {
    next(error);  // delegate to centralized error handler middleware
  }
});

export default router;
