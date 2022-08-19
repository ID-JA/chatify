const Message = require("../models/messages");
const ApiError = require("../classes/ApiErrors.js");

const createMessage = async (req, res, next) => {
  const { chatID, from, text } = req.body;

  if (!chatID || !from || !text) {
    throw ApiError.BadRequest("Missing chat users");
  }

  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    next(err);
  }
};

// Get messages from a chat
const getMessagesByChat = async (req, res, next) => {
  try {
    const messages = await Message.find({
      chatID: req.params.id,
    });
    res.status(200).json(messages);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createMessage,
  getMessagesByChat,
};
