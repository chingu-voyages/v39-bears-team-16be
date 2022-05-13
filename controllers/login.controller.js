const passport = require("../middlewares/passport.middleware");

function LoginController() {
  this.store = function store(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
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
        res
          .status(200)
          .send({ data: { message: "Successfully authenticated." } });
      });
    })(req, res, next);
  };
}

const loginController = new LoginController();

Object.freeze(loginController);

module.exports = loginController;
