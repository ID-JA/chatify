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

module.exports = {
  createChat,
};
