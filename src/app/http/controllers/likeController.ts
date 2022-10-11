// const transaction = require('../../dao/transaction');

import LikeDao from '../../dao/likeDao';

//need fr replacing transaction?
import PlanDao from '../../dao/planDao';
import { Request, Response, NextFunction } from 'express';


class LikeController {

    /**
     * transaction initializes client
     */

  static async like(req: Request, res: Response, next: NextFunction) {

    //transaction starts client session
    const { planId } = req.params;
    const { email } = req.user;  

    try {
      const createLikeResult = await LikeDao.create({ email, planId, session});

      const updateLikeResult = await PlanDao.updateLike({planId, val:1, session})
      return res.status(200).send({ createLikeResult, updateLikeResult });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  };

  static async dislike(req: Request, res: Response, next: NextFunction) {
    //transaction starts client session

    const { planId } = req.params;
    const { email } = req.user;

    try {
      const createLikeResult = await LikeDao.delete({
        email, 
        planId, 
        session
      });
      const updateLikeResult = await PlanDao.updateLike({
        email, 
        planId, 
        val:-1, 
        session
      });

      return res.status(200).send({ createLikeResult, updateLikeResult });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  };
}

export default LikeController;
