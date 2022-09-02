const router = require("express").Router();
const {
  removeUser,
  getUser,
  sendFriendReq,
  acceptFriendReq,
  refuseFriendReq,
  removeFriend,
  cancelFriendRequest,
} = require("../controllers/users");

router.post("/remove/:id", removeUser);
router.post("/sendrequest", sendFriendReq);
router.post("/acceptrequest", acceptFriendReq);
router.post("/refuserequest", refuseFriendReq);
router.post("/removefriend", removeFriend);
router.post("/cancelfriendrequest", cancelFriendRequest);
router.get("/", getUser);

module.exports = router;
