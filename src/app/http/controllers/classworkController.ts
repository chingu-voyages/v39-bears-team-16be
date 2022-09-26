import { Request, Response, NextFunction } from 'express';
import ClassDao from '../../dao/classDao';
import * as mongodb from 'mongodb';

class ClassworkController {
  static async index(req: Request, res: Response, next: NextFunction) {
    const { classId } = req.params;
    try {
      const classworks = await ClassDao.allClassworks(new mongodb.ObjectId(classId));
      return res.status(200).json(classworks);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  }

  static async store(req: Request, res: Response, next: NextFunction) {
    const { classId } = req.params;
    const { name, description, link, type } = req.body;

    try {
      const result = await ClassDao.createClasswork({
        classId: new mongodb.ObjectId(classId),
        name,
        description,
        link,
        type,
      });
      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  }

  static async destroy(req: Request, res: Response, next: NextFunction) {
    const { classId, classworkId } = req.params;
    try {
      const result = await ClassDao.deleteClasswork({
        classId: new mongodb.ObjectId(classId),
        classworkId: new mongodb.ObjectId(classId),
      });
      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  }
}

export default ClassworkController;
