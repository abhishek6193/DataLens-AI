import express from "express";
import cors from "cors";
import { readCSV } from "./src/utils/loadCSV";
import metricsRoute from "./src/routes/metrics";
import subscriptionsRoute from "./src/routes/subscriptions";
import performancesRoute from "./src/routes/performances";
import engagementsRoute from "./src/routes/engagements";


const app = express();
app.use(cors());

const PORT: number = 6193;

// route to understand the health of the app
app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        message: "Server is running",
        date: new Date()
    });
});

// subscriptions routes
app.use("/api/subscriptions", subscriptionsRoute);

// engagements routes
app.use("/api/engagements", engagementsRoute);

// performances routes
app.use("/api/performances", performancesRoute);

// metrics routes
app.use("/api/metrics", metricsRoute);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
