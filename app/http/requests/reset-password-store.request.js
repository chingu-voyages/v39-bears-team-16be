const { body, validationResult } = require('express-validator');

const resetPasswordRequest = [
  body('email')
    .isEmail()
    .isLength({ min: 1, max: 255 })
    .normalizeEmail({ gmail_remove_dots: false }),
  body('password').isAlphanumeric().isLength({ min: 1, max: 255 }).trim(),
  body('passwordConfirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password.');
    }
    return true;
  }),
  body('token').not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    return next();
  },
];

module.exports = resetPasswordRequest;
