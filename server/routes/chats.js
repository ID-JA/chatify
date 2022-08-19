const router = require("express").Router();
const { createChat, getChatsByUser } = require("../controllers/chats");

router.post("/new", createChat);
router.get("/:id", getChatsByUser);

module.exports = router;
