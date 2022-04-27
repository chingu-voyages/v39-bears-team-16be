const { body } = require("express-validator");

const forgotPasswordRequest = [
  body("email").isEmail().isLength({ min: 1, max: 255 }).normalizeEmail({ gmail_remove_dots: false })
];

module.exports = forgotPasswordRequest;
