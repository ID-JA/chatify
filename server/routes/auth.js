const router = require("express").Router();
const passport = require("passport");

const {
  signup,
  confirmAccount,
  login,
  redirect,
  logout,
} = require("../controllers/auth");
const upload = require("../config/multer.js");

router.post("/signup", upload.single("picture"), signup);
router.post("/confirm", confirmAccount);
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  login
);
router.get("/logout", logout);

/**
 * GOOGLE OAUTH ROUTES
 */
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile email"] })
);
router.get("/google/redirect", passport.authenticate("google"), redirect);

module.exports = router;
