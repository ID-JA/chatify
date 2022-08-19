const router = require("express").Router();
const {
  removeUser,
  getUserById,
  sendFriendReq,
  acceptFriendReq,
  refuseFriendReq,
} = require("../controllers/users");

router.post("/remove/:id", removeUser);
router.post("/sendrequest", sendFriendReq);
router.post("/acceptrequest", acceptFriendReq);
router.post("/refuserequest", refuseFriendReq);
router.get("/:id", getUserById);

module.exports = router;
