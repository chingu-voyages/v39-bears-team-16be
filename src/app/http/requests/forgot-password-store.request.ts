import { Request, Response, NextFunction } from 'express';

const { body, validationResult } = require('express-validator');

const forgotPasswordRequest = [
  body('email')
    .isLength({ min: 1, max: 255 })
    .trim()
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: false }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    return next();
  },
];

module.exports = forgotPasswordRequest;
