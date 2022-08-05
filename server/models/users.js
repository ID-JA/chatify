const mongoose = require("mongoose");

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
  googleID: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
  friends: {
    type: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    default: [],
  },
  //   interests: {
  //     type: [{ type: mongoose.Types.ObjectId, ref: "interests" }],
  //     default: [],
  //   },
  reqSent: {
    type: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    default: [],
  },
  reqRecieved: {
    type: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    default: [],
  },
  lastOnline: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
