import * as mongodb from 'mongodb';
import { Request, Response, NextFunction } from 'express';
import ClassDao from '../../dao/classDao';
import ProgressDao from '../../dao/progressDao';

class ProgressController {
  static async markAsComplete(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      return res.status(403);
    }

    const { classId, classworkId } = req.params;
    const { email } = req.user;
    const { planId } = req.body;

    try {
      const result = await ProgressDao.updateClassworkProgressValue({
        email,
        planId: new mongodb.ObjectId(planId),
        classId: new mongodb.ObjectId(classId),
        classworkId: new mongodb.ObjectId(classworkId),
        val: 1,
      });

      return res.send({ result });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  }

  static async markAsIncomplete(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      return res.status(403);
    }

    const { classId, classworkId } = req.params;
    const { email } = req.user;
    const { planId } = req.body;

    try {
      const result = await ProgressDao.updateClassworkProgressValue({
        email,
        planId: new mongodb.ObjectId(planId),
        classId: new mongodb.ObjectId(classId),
        classworkId: new mongodb.ObjectId(classworkId),
        val: 0,
      });

      return res.send({ result });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  }
}

export default ProgressController;
