const { validationResult } = require("express-validator");
const loginStoreRequest = require("../middlewares/requests/login-store.request");
const passport = require("../middlewares/passport.middleware");

function LoginController() {
  this.store = function store(req, res, next) {
    passport.authenticate("local", { failWithError: true })(req, res, next),
      (err, req, res, next) => {
        if (err) {
          return res.status(401).send({ message: "authentication failed" });
        }
        res.status(200).send({ message: "authentication success" });
      };
  };
}

const loginController = new LoginController();

Object.freeze(loginController);

module.exports = loginController;
