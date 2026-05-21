import express from "express";
import cors from "cors";

// load env config
import dotenv from "dotenv";
dotenv.config();

// import routes
import metricsRoute from "./src/routes/metrics";
import subscriptionsRoute from "./src/routes/subscriptions";
import performancesRoute from "./src/routes/performances";
import engagementsRoute from "./src/routes/engagements";

// import custom middlewares
import { logger } from "./src/middleware/logger";
import { errorHandler } from "./src/middleware/errorHandler";

// import config object
import { config } from "./src/config";

// import utilities
import { logError, logInfo } from "./src/utils/logger";

const app = express(); // express instance

/* Setup server config */
const PORT: number = Number(config.port) || 6193; // define server port number

/* Register middlewares */
app.use(cors()); // apply cors headers to all incoming requests to this server to prevent cross origin issues
app.use(logger); // add custom logging middleware to all incoming requests

// register route to understand the health of the app
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is running",
    date: new Date(),
  });
});

/* Register application routes */
app.use("/api/subscriptions", subscriptionsRoute); // handle all subscriptions routes
app.use("/api/engagements", engagementsRoute); // handle all engagements routes
app.use("/api/performances", performancesRoute); // handle all performances routes
app.use("/api/metrics", metricsRoute); // handle all metrics routes

// register error handler middleware
app.use(errorHandler);

// setup is complete, start the server on the preferred port, listen to all the incoming requests
app.listen(PORT, (err) => {
  if (err) {
    // basic error handling for server startup
    logError("Unhandled application error", {
      error: err instanceof Error ? err.message : "Unknown error",
    });
  } else {
    logInfo("Server is running", {
      port: PORT,
    });
  }
});
