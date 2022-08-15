// dependencies
const jwt = require("jsonwebtoken");

// files
const ApiError = require("../classes/ApiErrors.js");
const cloudinary = require("../config/cloudinary.js");
const { sendConfirmationEmail } = require("../services/emailing.js");

// models
const User = require("../models/users.js");

const signup = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    if (email == undefined || username == undefined || password == undefined) {
      throw ApiError.BadRequest("Missing required fields");
    }
    let user = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (user) {
      throw ApiError.BadRequest("Email or username already exists");
    }

    // SAVE PICTURE TO CLOUDINARY
    const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "users_pictures",
    });

    user = new User({
      username,
      email,
      password,
      picture: {
        publicID: cloudinaryResult.public_id,
        pictureURL: cloudinaryResult.url,
      },
    });
    var result = await user.save();

    // SEND CONFIRMATION EMAIL
    const otp = await sendConfirmationEmail(result);

    // update user with otp
    await User.findByIdAndUpdate(result._id, {
      OTP: otp,
    });

    return res.json({
      message: "Check out your email to confirm your account",
    });
  } catch (error) {
    if (result !== null && result !== undefined) {
      await cloudinary.uploader.destroy(result?.picture.publicID);
    }
    next(error);
  }
};

const confirmAccount = async (req, res, next) => {
  const { otp } = req.body;
  try {
    if (otp == undefined) {
      throw ApiError.BadRequest("Missing required fields");
    }

    let user = await User.findOne({ OTP: otp });
    if (!user) {
      throw ApiError.BadRequest("Wrong OTP");
    }
    await User.updateOne({ _id: user._id }, { isConfirmed: true });
    await User.updateOne({ _id: user._id }, { $unset: { OTP: "" } });

    res.json({ msg: "account confirmed" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { _id, isConfirmed } = req.user;
    if (!isConfirmed) throw new Error("Please confirm your account!");
    const accessToken = jwt.sign(
      {
        userID: _id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    const refreshToken = jwt.sign(
      {
        userID: _id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1y",
      }
    );

    res.json({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  confirmAccount,
  login,
};
