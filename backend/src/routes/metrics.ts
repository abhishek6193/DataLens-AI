import express from "express";
import { readCSV } from "../utils/loadCSV";
import { calculateChurnRate, calculateTotalRevenue, calculateTotalSubscriptions } from "../utils/metrics";

const router = express.Router();

router.get("/", async (req, res) => {
    const subs: Array<object> = await readCSV("../data/subscriptions.csv");
    
    const totalRevenue = calculateTotalRevenue(subs);
    const churnRate = calculateChurnRate(subs);
    const totalSubscriptions = calculateTotalSubscriptions(subs);

    res.json({
        totalRevenue,
        churnRate,
        totalSubscriptions
    })
})

export default router;
