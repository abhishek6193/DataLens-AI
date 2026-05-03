import express from "express";

// import utilities
import { readCSV } from "../utils/loadCSV";

const router = express.Router(); // express's router instance

/* Register engagements routes */
router.get("/", async (req, res) => { // default route to return engagements data as json
    try {
    const engagements: Array<object> = await readCSV("../data/engagement.csv"); // get engagenments data

    // return engagements in json response
    res.json(engagements);
    } catch (error) {
        console.error(`Error fetching engagements data: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
