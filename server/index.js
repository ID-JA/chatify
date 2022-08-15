const express = require("express");
const passport = require("passport");
const app = express();
require("dotenv").config();
const passportSetup = require("./config/passport.js");
require("colors");
require("./config/passport.js");
const cors = require("cors");
const connectDB = require("./config/db");
const { handleApiError } = require("./middlewares/errorHandler");

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extends: true }));
app.use(passport.initialize());

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
