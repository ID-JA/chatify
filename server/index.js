const express = require("express");
const app = express();
require("dotenv").config();
require("colors");
const connectDB = require("./config/db");
const { handleApiError } = require("./middlewares/errorHandler");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extends: true }));

// Routes
app.use("/api/auth", require("./routes/auth.js"));

// error middleware
app.use(handleApiError);

const port = process.env.PORT || 5000;
const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`.bgGreen.bold);
  });
};

startServer();
