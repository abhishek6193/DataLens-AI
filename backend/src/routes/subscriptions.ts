import express from "express";

// import utilities
import { readCSV } from "../utils/loadCSV";

const router = express.Router(); // express's router instance

router.get("/", async (req, res) => { // default route to return subscriptions data as json
  try {
    const subs: Array<object> = await readCSV("../data/subscriptions.csv"); // get subscriptions data

    // return subscriptions in json response
    res.json(subs);
  } catch (error) {
    console.error(`Error fetching subscriptions data: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
