// dependencies
const jwt = require("jsonwebtoken");

// files
const ApiError = require("../classes/ApiErrors.js");
const cloudinary = require("../config/cloudinary.js");
const {
  sendConfirmationEmail,
  sendResetPasswordEmail,
} = require("../services/emailing.js");

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

    console.log("after cloudinary");

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

    return res.redirect(`${process.env.CLIENT_URL}/auth/signin`);
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

    res.json({ user: req.user, accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

/**
 * OAUTH
 */

const redirect = async (req, res, next) => {
  console.log(req.user);
  res.send("You are logged in");
};

const logout = (req, res, next) => {
  try {
    req.logout();
    res.send("You are logged out");
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (email == undefined)
      throw ApiError.BadRequest("Missing required fields");
    const user = await User.findOne({ email });
    if (user == null || user == undefined)
      throw ApiError.BadRequest("Email not found");
    if (!user.isConfirmed)
      throw ApiError.BadRequest("Please confirm your account");
    await sendResetPasswordEmail(user);
    res.json({ message: "A reset password link has been sent to your email" });
  } catch (error) {
    next(error);
  }
};

const resetPasswordGET = async (req, res, next) => {
  try {
    const { id, token } = req.params;

    if (token == undefined || id == undefined) {
      throw ApiError.BadRequest("Please click on the link sent to your email");
    }

    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (payload.userID !== id || payload == undefined) {
      throw ApiError.Unauthorized("You are not authorized");
    }

    res.redirect(`${process.env.CLIENT_URL}/auth/reset-password/${id}`);
  } catch (error) {
    next(error);
  }
};

const resetPasswordPOST = async (req, res, next) => {
  try {
    const { newPassword, confirmNewPassword } = req.body;
    const { id } = req.params;

    if (newPassword == undefined || confirmNewPassword == undefined) {
      throw ApiError.BadRequest("Please provide all the required fields");
    }

    if (newPassword !== confirmNewPassword) {
      throw ApiError.BadRequest("Passwords do not match");
    }

    const user = await User.findById(id);
    if (user == undefined) {
      throw ApiError.NotFound("User not found");
    }

    const hashedPassword = await user.hashPassword(newPassword);

    await User.findByIdAndUpdate(id, { password: hashedPassword });
    res.status(200).json({ message: "Password updated" });
  } catch (e) {
    next(e);
  }
};

const changePassword = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id);

    if (user == null) {
      throw ApiError.NotFound("User not found");
    }

    if (
      req.body.password == undefined ||
      req.body.confirmPassword == undefined
    ) {
      throw ApiError.BadRequest("please provide the required fields");
    }

    if (req.body.password !== req.body.confirmPassword) {
      throw ApiError.BadRequest("passwords don't match");
    }

    const hashedPassword = await user.hashPassword(req.body.password);

    await User.findByIdAndUpdate(req.params.id, { password: hashedPassword });

    // res.logout()
    // res.redirect(`${process.env.CLIENT_URL}/auth/login`)

    res.status(200).json({ message: "password changed" });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  signup,
  confirmAccount,
  login,
  redirect,
  logout,
  forgotPassword,
  resetPasswordGET,
  resetPasswordPOST,
  changePassword,
};
