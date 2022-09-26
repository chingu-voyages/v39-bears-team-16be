import UserDao from '../app/dao/userDao';

require('dotenv').config();

const passport = require('passport');
const LocalStrategy = require('passport-local');
const GitHubStrategy = require('passport-github2').Strategy;
const { hashPassword } = require('../utilities/password.util');

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (username: string, password: string, cb: (...params: any) => any) => {
      try {
        const user = await UserDao.find(username);

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
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'https://bears-team-16be.herokuapp.com/auth/github/callback',
    },
    async (accessToken: string, refreshToken: string, profile: any, cb: (...params: any) => any) => {
      const { displayName } = profile;
      const email = profile.emails[0].value.toLowerCase();

      if (email === null) {
        return cb(null, false, {
          message: 'Email is not public.',
        });
      }

      try {
        const result = await UserDao.findOrCreate({
          name: displayName,
          email,
        });
        return cb(null, result);
      } catch (err) {
        return cb(err);
      }
    }
  )
);

passport.serializeUser((user: any, cb: (...params: any) => any) => {
  process.nextTick(() => {
    cb(null, user.email);
  });
});

passport.deserializeUser(async (email: string, cb: (...params: any) => any) => {
  process.nextTick(async () => {
    try {
      const user = await UserDao.find(email);
      return cb(null, user);
    } catch (err) {
      console.error(err);
      return cb(err);
    }
  });
});

export default passport;
