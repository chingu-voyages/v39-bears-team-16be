const passport = require("../middlewares/passport.middleware");

function LoginController() {
  this.store = function store(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.send("No User Exists");
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.send("Successfully Authenticated");
          console.log(req.user);
        });
      }
    })(req, res, next);
  };
}

const loginController = new LoginController();

Object.freeze(loginController);

module.exports = loginController;
