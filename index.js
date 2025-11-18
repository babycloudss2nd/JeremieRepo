require('dotenv').config(); // Load .env variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection (Atlas)
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("✅ MongoDB connected");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

// Routes
const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

// Start server
const port = process.env.PORT || 80;
app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Server running at http://3.90.159.31:${port}`);
});
