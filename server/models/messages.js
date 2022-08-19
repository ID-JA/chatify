const mongoose = require("mongoose");
const Chat = require("./chats");

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

// set this message to lastMessage in chat model after save
MessageSchema.post("save", async function () {
  const chat = await Chat.findById(this.chatID);
  chat.lastMessage = this.text;
  await chat.save();
});

module.exports = mongoose.model("Message", MessageSchema);
