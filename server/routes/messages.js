const router = require("express").Router();
const { createMessage, getMessagesByChat } = require("../controllers/messages");

router.post("/new", createMessage);
router.get("/:id", getMessagesByChat);

module.exports = router;
