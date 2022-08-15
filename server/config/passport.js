const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20");

const User = require("../models/users.js");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

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

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("entered callback func : ", profile);
      try {
        let user = await User.findOne({
          // googleId: profile.id,
          email: profile.emails[0].value,
        });
        if (!user) {
          user = new User({
            googleID: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            picture: {
              pictureURL: profile.photos[0].value,
            },
            isConfirmed: true,
          });
          await user.save();
        }
        done(null, user);
      } catch (error) {
        console.log(error);
        done(error);
      }
    }
  )
);
