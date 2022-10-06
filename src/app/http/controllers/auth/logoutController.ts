import { Request, Response, NextFunction } from 'express';
const logDao = require('../../../dao/log.dao');

class LogoutController {
  static async store(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      return res.status(403);
    }

    try {
      await logDao.logout(req.user.email);
      req.logout();
      return res.status(200).send({ message: 'Success' });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  };
}

export default LogoutController;
