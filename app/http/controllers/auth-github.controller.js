require('dotenv').config();

const passport = require('../config/passport.config');

function AuthGithubController() {
  this.store = function store(req, res, next) {
    passport.authenticate('github', (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).send({ error: { message: info.message } });
      }

      return req.logIn(user, (error) => {
        if (error) {
          return next(error);
        }

        return res.redirect(`${process.env.FRONTEND_URL}/admin/cohorts`);
      });
    })(req, res, next);
  };
}

const authGithubController = new AuthGithubController();

Object.freeze(authGithubController);

module.exports = authGithubController;
