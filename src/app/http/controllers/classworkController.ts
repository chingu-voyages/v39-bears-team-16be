import ClassworkModel, { ClassworkType } from '../../models/ClassworkModel';
import { Request, Response, NextFunction } from 'express';
import userDao from '../../dao/user.dao';

const { ObjectId } = require('mongodb');
const classDao = require('../../dao/class.dao');

class ClassworkController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    const { classId } = req.params;
    try {
      const classworks = await classDao.allClassworks(classId);
      return res.status(200).json(classworks);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  };

  store = async (req: Request, res: Response, next: NextFunction) => {
    const { classId } = req.params;
    const { name, description, link, type } = req.body;

    try {
      const newClasswork = new ClassworkModel(name, description, type === ClassworkType.ASSIGNMENT ? '' : link, type);

      const result = await classDao.createClasswork(classId, newClasswork);
      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  };

  destroy = async (req: Request, res: Response, next: NextFunction) => {
    const { classId, classworkId } = req.params;
    try {
      const result = await classDao.deleteClasswork({ classId, classworkId });
      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  };

  markAsComplete = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(403);
    }

    const { classId, classworkId } = req.params;
    const { email } = req.user;
    const { completed } = req.body;

    try {
      // const result = await userDao.updateClasswork({
      //   email,
      //   classId,
      //   classworkId,
      //   completed,
      // });
      return res.status(200);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  };
}

export default ClassworkController;
