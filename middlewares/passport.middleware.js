const passport = require("passport");
const LocalStrategy = require("passport-local");
const users = require("../dao/user.dao");
const { validatePassword } = require("../utilities/password.util");

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (username, password, cb) => {
      try {
        const user = await users.findUserBy("email", username);
        if (!user)
          return cb(null, false, {
            message: "Incorrect username or password.",
          });
        const valid = validatePassword(password, user.password, user.salt);
        if (!valid)
          return cb(null, false, {
            message: "Incorrect username or password.",
          });
        return cb(null, user);
      } catch (err) {
        return cb(err);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    cb(null, user.email);
  });
});

passport.deserializeUser((username, cb) => {
  process.nextTick(async () => {
    try {
      const user = await users.findUserBy("email", username);
      return cb(null, user);
    } catch (err) {
      cb(err);
    }
  });
});

module.exports = passport;
