const { body, validationResult } = require("express-validator");
const users = require("../../dao/user.dao");

const registerStoreRequest = [
  body("name")
    .isAlpha("en-US", { ignore: ["-", "_"] })
    .isLength({ min: 1, max: 255 })
    .trim()
    .escape(),
  body("email")
    .isLength({ min: 1, max: 255 })
    .trim()
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: false })
    .custom(async (value) => {
      const user = await users.findUserBy("email", value);
      if (user) {
        return Promise.reject("E-mail already in use");
      } 
    }),
  body("password").isAlphanumeric().isLength({ min: 1, max: 255 }).trim(),
  function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  }
];

module.exports = registerStoreRequest;
