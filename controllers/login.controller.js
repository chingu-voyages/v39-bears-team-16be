const { validationResult } = require("express-validator");
const loginStoreRequest = require("../middlewares/requests/login-store.request");
const passport = require("../middlewares/passport.middleware");

function LoginController() {
  this.store = [
    loginStoreRequest,
    (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      next();
    },
    passport.authenticate("local", { failWithError: true }),
    (err, req, res, next) => {
      if (err) {
        return res.status(401).send({ message: "authentication failed" });
      }
      next();
    },
    (req, res, next) => {
      res.status(200).send(req.user);
    }
  ];
}

const loginController = new LoginController();

Object.freeze(loginController);

module.exports = loginController;
