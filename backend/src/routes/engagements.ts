import express from "express";
import { readCSV } from "../utils/loadCSV";

const router = express.Router();

router.get("/", async (req, res) => {
    const engagements: Array<object> = await readCSV("../data/engagement.csv");
    res.json(engagements);
});

export default router;
