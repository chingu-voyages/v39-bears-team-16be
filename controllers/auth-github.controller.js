const passport = require("../middlewares/passport.middleware");

function AuthGithubController() {
  this.store = function store(req, res, next) {
    passport.authenticate("github", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.status(401).send({ error: { message: info.message } });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        res.redirect("http://localhost:3000/admin/cohorts");
      });
    })(req, res, next);
  };
}

const authGithubController = new AuthGithubController();

Object.freeze(authGithubController);

module.exports = authGithubController;
