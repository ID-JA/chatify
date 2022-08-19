const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    chatID: {
      type: String,
    },
    from: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
