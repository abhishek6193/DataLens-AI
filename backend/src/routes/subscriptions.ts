import express from "express";
import { readCSV } from "../utils/loadCSV";

const router = express.Router();

router.get("/", async (req, res) => {
    const subs: Array<object> = await readCSV("../data/subscriptions.csv");
    res.json(subs);
});

export default router;
