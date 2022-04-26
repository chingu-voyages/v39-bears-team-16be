const { validationResult } = require("express-validator");

function LoginController() {
  this.store = function store(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  };
}

const loginController = new LoginController();

Object.freeze(loginController);

module.exports = loginController;
