const { body } = require("express-validator");

const forgotPasswordRequest = [
  body("email").isEmail().isLength({ min: 1, max: 25 }).normalizeEmail()
];

module.exports = forgotPasswordRequest;
