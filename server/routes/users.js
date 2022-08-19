const router = require("express").Router();
const { removeUser, getUserById } = require("../controllers/users");

router.post("/remove/:id", removeUser);
router.get("/:id", getUserById);

module.exports = router;
