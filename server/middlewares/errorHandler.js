const ApiError = require("../classes/ApiErrors.js");
const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");

const handleApiError = (e, req, res, next) => {
  console.log(e);

  if (e instanceof ApiError) {
    return res.status(e.statusCode).json({ message: e.message });
  }

  if (e instanceof mongoose.Error.ValidationError || e.code === 11000) {
    return res.status(400).json({
      message: "Please verify your data",
      serverMsg: e.message,
    });
  }

  //   if (e instanceof jwt.TokenExpiredError) {
  //     return res.status(401).json({
  //       message: "Your session might be expired, please login again",
  //     });
  //   }

  return res.status(500).json({
    message: "Something went wrong",
  });
};

module.exports = { handleApiError };
