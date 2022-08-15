const router = require("express").Router();
const passport = require("passport");

const { signup, confirmAccount, login } = require("../controllers/auth");
const upload = require("../config/multer.js");

router.post("/signup", upload.single("picture"), signup);
router.post("/confirm", confirmAccount);
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  login
);

/**
 * GOOGLE OAUTH ROUTES
 */
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

module.exports = router;
