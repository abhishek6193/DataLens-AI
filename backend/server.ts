import express from "express";
import cors from "cors";

// import routes
import metricsRoute from "./src/routes/metrics";
import subscriptionsRoute from "./src/routes/subscriptions";
import performancesRoute from "./src/routes/performances";
import engagementsRoute from "./src/routes/engagements";

const app = express(); // express instance

/* Setup server config */
const PORT: number = 6193; // define server port number

/* Register middlewares */
app.use(cors()); // apply cors headers to all incoming requests to this server to prevent cross origin issues

// register route to understand the health of the app
app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        message: "Server is running",
        date: new Date()
    });
});

/* Register application routes */
app.use("/api/subscriptions", subscriptionsRoute); // handle all subscriptions routes
app.use("/api/engagements", engagementsRoute); // handle all engagements routes
app.use("/api/performances", performancesRoute); // handle all performances routes
app.use("/api/metrics", metricsRoute); // handle all metrics routes

// setup is complete, start the server on the preferred port, listen to all the incoming requests
app.listen(PORT, (err) => {
    if (err) { // basic error handling for server startup
        console.error(`Error starting server: ${err}`);
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
});
