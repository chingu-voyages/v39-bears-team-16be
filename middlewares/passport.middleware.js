require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const TwitterStrategy = require("passport-twitter");
const users = require("../dao/user.dao");
const { validatePassword } = require("../utilities/password.util");

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (username, password, cb) => {
      try {
        const user = await users.attemptLogin(username);
        if (!user) {
          return cb(null, false, {
            message: "Incorrect username or password.",
          });
        }

        const valid = validatePassword(password, user.password, user.salt);

        if (!valid) {
          return cb(null, false, {
            message: "Incorrect username or password.",
          });
        }

        return cb(null, user);
      } catch (err) {
        return cb(err);
      }
    }
  )
);

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callback: `http://127.0.0.1:5000/auth/twitter/callback`,
    },
    async function (token, tokenSecret, profile, cb) {
      const user = await users.upsertUser(profile.id);
      return cb(err, user);
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user.email);
});

passport.deserializeUser(async (username, cb) => {
  try {
    const user = await users.findUserBy("email", username);
    // filter out data
    cb(null, user);
  } catch (err) {
    cb(err);
  }
});

module.exports = passport;
