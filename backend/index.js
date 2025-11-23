const express = require("express");

const app = express(); // Create an instance of an Express application

app.use(express.json()); // Middleware to parse JSON request bodies

const PORT = 6193; // Define the port number

// Define a simple route for the root URL
app.get("/", (req, res) => {
    res.status(200).send("Hello, World!");
});

// listen for incoming requests on the defined port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
