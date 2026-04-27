import express from "express";
import cors from "cors";

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

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
