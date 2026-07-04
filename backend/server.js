require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const habitRoutes = require("./routes/habits");

const app = express();

connectDB();

// CORS_ORIGIN can be set to your deployed frontend's URL in production.
// Left unset, it allows any origin (fine for a personal project).
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

app.use("/api/habits", habitRoutes);

app.get("/", (req, res) => {
  res.send("Discipline habit dashboard API is running.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
