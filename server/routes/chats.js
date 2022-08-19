const router = require("express").Router();
const { createChat } = require("../controllers/chats");

router.post("/new", createChat);

module.exports = router;
