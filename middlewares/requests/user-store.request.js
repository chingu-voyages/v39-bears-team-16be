const { body } = require("express-validator");
const users = require("../../dao/user.dao");

const userStoreRequest = [
  body("name")
    .isAlpha("en-US", { ignore: ["-", "_"] })
    .isLength({ min: 1, max: 255 })
    .trim()
    .escape(),
  body("email")
    .isLength({ min: 1, max: 255 })
    .trim()
    .isEmail()
    .normalizeEmail()    
    .custom(async (value) => {
      const user = await users.findUserBy("email", value);
      if (user) return Promise.reject("E-mail already in use");
    }),
  body("password").isAlphanumeric().isLength({ min: 1, max: 255 }).trim(),
];

module.exports = userStoreRequest;
