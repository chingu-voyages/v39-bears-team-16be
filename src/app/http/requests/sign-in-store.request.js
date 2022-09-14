const { body, validationResult } = require("express-validator");

const signInStoreRequest = [
  body("email").isLength({ min: 1, max: 255 }).trim().isEmail().normalizeEmail({ gmail_remove_dots: false }),
  body("password").isAlphanumeric().isLength({ min: 1, max: 255 }).trim(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    return next();
  },
];

module.exports = signInStoreRequest;
