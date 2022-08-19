const router = require("express").Router();
const {
  removeUser,
  getUserById,
  sendFriendReq,
  acceptFriendReq,
} = require("../controllers/users");

router.post("/remove/:id", removeUser);
router.post("/sendrequest", sendFriendReq);
router.post("/acceptrequest", acceptFriendReq);
router.get("/:id", getUserById);

module.exports = router;
