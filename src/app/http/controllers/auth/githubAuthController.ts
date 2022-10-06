import { Request, Response, NextFunction } from 'express';
import passport from '../../../../config/passport.config';
const logDao = require('../../../dao/log.dao');

class GithubAuth {
  static index(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('github', { scope: ['user:email'] })(req, res, next);
  };

  static store(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('github', async (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).send({ error: { message: info.message } });
      }

      await logDao.login(user.email);

      return req.login(user, (e) => {
        if (e) {
          return next(e);
        }

        return res.redirect(`${process.env.FRONTEND_URL}/admin/cohorts`);
      });
    })(req, res, next);
  };
}

export default GithubAuth;
