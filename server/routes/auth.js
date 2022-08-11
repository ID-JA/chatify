const router = require("express").Router();
const { signup, confirmAccount } = require("../controllers/auth");
const upload = require("../config/multer.js");

router.post("/signup", upload.single("picture"), signup);
router.post("/confirm", confirmAccount);

module.exports = router;
