import UserDao from '../../dao/userDao';
import { Request, Response, NextFunction } from 'express';

const { body, validationResult } = require('express-validator');

const signUpStoreRequest = [
  body('name')
    .isAlpha('en-US', { ignore: ['-', '_'] })
    .isLength({ min: 1, max: 255 })
    .trim()
    .escape(),
  body('email')
    .isLength({ min: 1, max: 255 })
    .trim()
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: false })
    // eslint-disable-next-line consistent-return
    .custom(async (value: string) => {
      const user = await UserDao.find(value);
      if (user) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject('E-mail already in use');
      }
    }),
  body('password').isAlphanumeric().isLength({ min: 1, max: 255 }).trim(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    return next();
  },
];

module.exports = signUpStoreRequest;
