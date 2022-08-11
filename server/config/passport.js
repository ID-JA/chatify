const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/users.js");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) return done(null, false, { message: "Invalid email" });

        const isMatch = await user.isValidPassword(password);
        if (!isMatch) return done(null, false, { message: "Invalid password" });

        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
