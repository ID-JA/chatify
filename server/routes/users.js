const router = require("express").Router();
const { removeUser } = require("../controllers/users");

router.post("/remove/:id", removeUser);

module.exports = router;
