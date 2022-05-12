const { body, validationResult } = require("express-validator");

const forgotPasswordRequest = [
  body("email")
    .isEmail()
    .isLength({ min: 1, max: 255 })
    .normalizeEmail({ gmail_remove_dots: false }),
  function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];

module.exports = forgotPasswordRequest;
