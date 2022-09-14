const { passport, logDao } = require("./index");

function GithubAuth() {
  this.index = (req, res, next) => {
    passport.authenticate("github", { scope: ["user:email"] })(req, res, next);
  };

  this.store = (req, res, next) => {
    passport.authenticate("github", async (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).send({ error: { message: info.message } });
      }

      await logDao.login(user.email);

      return req.login(user, (e) => {
        if (e) {
          return next(e);
        }

        return res.redirect(`${process.env.FRONTEND_URL}/admin/cohorts`);
      });
    })(req, res, next);
  };
}

const githubAuth = new GithubAuth();

Object.freeze(githubAuth);

module.exports = githubAuth;
