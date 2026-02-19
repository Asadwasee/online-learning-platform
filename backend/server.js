require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const protect = require("./middleware/authMiddleware");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));

app.get("/", (req, res) => {
    res.send("API is running...");
});
app.get("/api/profile", protect, (req, res) => {
    res.json(req.user);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
