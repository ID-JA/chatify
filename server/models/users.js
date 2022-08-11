const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  password: {
    type: String,
    required: true,
  },
  googleID: String,
  picture: {
    publicID: {
      type: String,
      required: true,
    },
    pictureURL: {
      type: String,
      required: true,
    },
  },
  isConfirmed: {
    type: Boolean,
    default: false,
  },
  friends: {
    type: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    default: [],
  },
  OTP: {
    type: String,
    default: "",
  },
  //   interests: {
  //     type: [{ type: mongoose.Types.ObjectId, ref: "Interests" }],
  //     default: [],
  //   },
  reqSent: {
    type: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    default: [],
  },
  reqRecieved: {
    type: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    default: [],
  },
  lastOnline: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", function () {
  const salt = bcrypt.genSaltSync(11);
  this.password = bcrypt.hashSync(this.password, salt);
});

const User = mongoose.model("User", userSchema);
module.exports = User;
