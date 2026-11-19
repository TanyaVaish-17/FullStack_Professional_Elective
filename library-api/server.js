// Imports
require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");

// App setup
const app = express();
app.use(express.json());

// Database
connectDB();

// Routes
app.use("/api/books", bookRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));