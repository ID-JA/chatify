const Chat = require("../models/chats");
const ApiError = require("../classes/ApiErrors.js");

const createChat = async (req, res, next) => {
  if (req.body.from == undefined || req.body.to == undefined) {
    throw ApiError.BadRequest("Missing chat users");
  }
  try {
    const newChat = new Chat({
      users: [req.body.from, req.body.to],
    });
    const chat = await newChat.save();
    res.status(200).json(chat);
  } catch (err) {
    next(err);
  }
};

// Get all chats of current user
const getChatsByUser = async (req, res, next) => {
  try {
    const chats = await Chat.find({
      users: { $in: [req.params.id] },
    });
    res.status(200).json(chats);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createChat,
  getChatsByUser,
};
