const ApiError = require("../classes/ApiErrors.js");
const mongoose = require("mongoose");
const multer = require("multer");
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

  if (e instanceof multer.MulterError) {
    return res.status(400).json({
      message:
        "An error occured while uploading your picture, please verify your picture extension and try again",
    });
  }

  return res.status(500).json({
    message: e.message,
  });
};

module.exports = { handleApiError };
