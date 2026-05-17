import express from "express";

// import utilities
import { readCSV } from "../utils/loadCSV";
import { PerformanceRow } from "../types";

const router = express.Router(); // express's router instance

/* Register performances routes */
router.get("/", async (req, res, next) => {
  // default route to return performances data as json
  try {
    const performances: PerformanceRow[] = await readCSV(
      "../data/performance.csv"
    ); // get performances data

    // return performances in json response
    res.json(performances);
  } catch (error) {
    next(error);  // delegate to centralized error handler middleware
  }
});

export default router;
