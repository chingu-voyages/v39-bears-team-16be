require('dotenv').config();

const passport = require('passport');
const LocalStrategy = require('passport-local');
const GitHubStrategy = require('passport-github2').Strategy;
const userDao = require('../app/dao/user.dao');
const { hashPassword } = require('../utilities/password.util');

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (username, password, cb) => {
      try {
        const user = await userDao.find(username);

        if (!user) {
          return cb(null, false, {
            msg: 'Incorrect username or password.',
            data: { email: username, timestamp: new Date() },
          });
        }

        if (user.hash !== hashPassword(password, user.salt).hash) {
          return cb(null, false, {
            msg: 'Incorrect username or password.',
            data: { email: username, timestamp: new Date() },
          });
        }

        return cb(null, user);
      } catch (err) {
        return cb(err);
      }
    },
  ),
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'https://bears-team-16be.herokuapp.com/auth/github/callback',
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
        const result = await userDao.findOrCreate({
          name: displayName,
          email,
        });
        return cb(null, result);
      } catch (err) {
        return cb(err);
      }
    },
  ),
);

passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    cb(null, user.email);
  });
});

passport.deserializeUser(async (email, cb) => {
  process.nextTick(async () => {
    try {
      const user = await userDao.find(email);
      return cb(null, user);
    } catch (err) {
      console.error(err);
      return cb(err);
    }
  });
});

module.exports = passport;
