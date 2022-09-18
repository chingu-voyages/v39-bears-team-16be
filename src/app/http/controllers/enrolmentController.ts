import { Request, Response, NextFunction } from 'express';
import UserDao from '../../dao/userDao';

class EnrolmentController {
  static async index(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      return res.status(403);
    }

    const { email } = req.user;
    try {
      const plans = await UserDao.allPlans(email);
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
      const result = await UserDao.addPlan({ email, planId });
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
      const result = await UserDao.removePlan({ email, planId });
      return res.status(200).json({ result });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  }
}

export default EnrolmentController;
