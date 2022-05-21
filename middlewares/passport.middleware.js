require('dotenv').config();

const passport = require('passport');
const LocalStrategy = require('passport-local');
const GitHubStrategy = require('passport-github2').Strategy;
const users = require('../dao/user.dao');
const { validatePassword } = require('../utilities/password.util');

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (username, password, cb) => {
    try {
      const user = await users.attemptLogin(username);
      if (!user) {
        return cb(null, false, {
          msg: 'Incorrect username or password.',
          data: { email: username, timestamp: new Date() },
        });
      }

      const valid = validatePassword(password, user.password, user.salt);

      if (!valid) {
        return cb(null, false, {
          msg: 'Incorrect username or password.',
          data: { email: username, timestamp: new Date() },
        });
      }

      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  })
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/auth/github/callback`,
    },
    async (accessToken, refreshToken, profile, cb) => {
      const { displayName } = profile;
      const email = profile.emails[0].value.toLowerCase();

      if (email === null) {
        return cb(null, false, {
          message: 'Email is not public.',
        });
      }

      try {
        const user = { name: displayName, email };
        const result = await users.findOrInsert(user);
        return cb(null, result);
      } catch (err) {
        return cb(err);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user.email);
});

passport.deserializeUser(async (username, cb) => {
  try {
    const user = await users.findUserBy('email', username);
    cb(null, user);
  } catch (err) {
    cb(err);
  }
});

module.exports = passport;
