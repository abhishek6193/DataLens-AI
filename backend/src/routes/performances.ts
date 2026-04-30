import express from "express";
import { readCSV } from "../utils/loadCSV";

const router = express.Router();

router.get("/", async (req, res) => {
    const performances: Array<object> = await readCSV("../data/performance.csv");
    res.json(performances);
});

export default router;
