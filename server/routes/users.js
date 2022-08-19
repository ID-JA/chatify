const router = require("express").Router();
const {
  removeUser,
  getUserById,
  sendFriendReq,
} = require("../controllers/users");

router.post("/remove/:id", removeUser);
router.post("/sendrequest", sendFriendReq);
router.get("/:id", getUserById);

module.exports = router;
