import express from "express";
import cors from "cors";
import { readCSV } from "./src/utils/loadCSV";

const app = express();
app.use(cors());

const PORT: number = 6193;

app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        message: "Server is running",
        date: new Date()
    });
});

// route to get subscriptions
app.get("/api/subscriptions", async (req, res) => {
    const subs: Array<object> = await readCSV("../data/subscriptions.csv");
    res.json(subs);
});

// route to get engagements
app.get("/api/engagements", async (req, res) => {
    const engagements: Array<object> = await readCSV("../data/engagement.csv");
    res.json(engagements);
});

// route to get performances
app.get("/api/performances", async (req, res) => {
    const performances: Array<object> = await readCSV("../data/performance.csv");
    res.json(performances);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
