const { body, validationResult } = require("express-validator");

const adminClassStoreRequest = [
  body("name").isLength({ min: 1, max: 255 }).trim().escape(),
  body("startDate").isDate(),
  body("endDate").isDate(),
  function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];

module.exports = adminClassStoreRequest;
