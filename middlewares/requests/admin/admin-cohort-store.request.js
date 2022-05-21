const { body, validationResult } = require('express-validator');

const adminCohortStoreRequest = [
  body('name').isLength({ min: 1, max: 255 }).trim().escape(),
  body('startDate').isDate(),
  body('endDate').isDate(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    return next();
  },
];

module.exports = adminCohortStoreRequest;
