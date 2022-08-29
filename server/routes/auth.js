const router = require("express").Router();
const passport = require("passport");

const {
  signup,
  confirmAccount,
  login,
  redirect,
  logout,
  forgotPassword,
  resetPasswordGET,
  resetPasswordPOST,
  changePassword,
} = require("../controllers/auth");
const upload = require("../config/multer.js");

router.post("/signup", upload.single("picture"), signup);
router.post("/confirm", confirmAccount);
router.post("/login", passport.authenticate("local"), login);
router.get("/logout", logout);
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword/:id", resetPasswordPOST);
router.put("/changepassword/:id", changePassword);
router.get("/resetpassword/:id/:token", resetPasswordGET);

/**
 * GOOGLE OAUTH ROUTES
 */
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile email"] })
);
router.get("/google/redirect", passport.authenticate("google"), redirect);

module.exports = router;
