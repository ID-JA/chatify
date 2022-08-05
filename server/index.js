const express = require("express");
const app = express();
require("dotenv").config();
require("colors");
const connectDB = require("./config/db");
const { handleApiError } = require("./middlewares/errorHandler");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extends: true }));

// error middleware
app.use(handleApiError);

const startServer = async () => {
  await connectDB();
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`.bgGreen.bold);
  });
};

startServer();
