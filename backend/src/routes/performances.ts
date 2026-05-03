import express from "express";

// import utilities
import { readCSV } from "../utils/loadCSV";

const router = express.Router(); // express's router instance

/* Register performances routes */
router.get("/", async (req, res) => { // default route to return performances data as json
    try {
        const performances: Array<object> = await readCSV("../data/performance.csv"); // get performances data

    // return performances in json response
    res.json(performances);
    } catch (error) {
        console.error(`Error fetching performances data: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
