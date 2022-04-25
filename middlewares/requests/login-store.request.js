const { body } = require("express-validator");

const loginStoreRequest = [
  body("email").isEmail().isLength({ min: 1, max: 25 }).normalizeEmail(),
  body("password").isAlphanumeric().isLength({ min: 1, max: 10 }).trim()
];

module.exports = loginStoreRequest;
