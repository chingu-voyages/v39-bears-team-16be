import { Request, Response, NextFunction } from 'express';
const { userDao } = require('./auth');

class EnrolmentController {
  static async index(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      return res.status(403);
    }

    const { email } = req.user;
    try {
      const plans = await userDao.allPlans(email);
      return res.status(200).json({ plans });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  }

  static async store(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      return res.status(403);
    }

    const { email } = req.user;
    const { planId } = req.body;
    try {
      const result = await userDao.addPlan({ email, planId });
      return res.status(200).json({ result });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  }

  static async destroy(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      return res.status(403);
    }

    const { email } = req.user;
    const { planId } = req.params;
    try {
      const result = await userDao.removePlan({ email, planId });
      return res.status(200).json({ result });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  }
}

export default EnrolmentController;
