const passport = require("../middlewares/passport.middleware");

function LoginController() {
  this.store = function store(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send(info.message);
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        } 
        res.status(200).send("Successfully authenticated.");
      });
    })(req, res, next);
  };
}

const loginController = new LoginController();

Object.freeze(loginController);

module.exports = loginController;
