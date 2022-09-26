/* eslint-disable no-underscore-dangle */
import ClassDao from '../../dao/classDao';
import { Request, Response, NextFunction } from 'express';
import * as mongodb from 'mongodb';

const planDao = require('../../dao/plan.dao');
const { userDao } = require('./auth');

class ClassController {
  static async index(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      return res.status(403);
    }

    const { planId } = req.params;
    const { email } = req.user;

    try {
      const values: any = await Promise.allSettled([
        planDao.allClasses(planId),
        userDao.findPlan({ email, planId }),
      ]);

      let { value: planResult } = values[0].value;
      const { value: userResult } = values[1].value;

      if (userResult) {
        const classProgresses = userResult[0].classes.reduce(
          (acc: {}, item: any) => ({
            ...acc,
            [item.classId]: item.progress,
          }),
          {}
        );

        planResult.classes = planResult.classes.map((item: any) => ({
          ...item,
          progress: classProgresses[item._id.toString()],
        }));

        planResult = {
          ...planResult,
          progress: userResult[0].progress,
        };
      }

      return res.status(200).json({ plan: planResult });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  }

  static async store(req: Request, res: Response, next: NextFunction) {
    const { planId } = req.params;
    const { name, description } = req.body;
    try {
      const classId = await ClassDao.create({ name, description });
      const addClass = await planDao.addClass({ planId, classId });

      return res.status(201).json({ msg: 'success!', data: addClass });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  }

  static async show(req: Request, res: Response, next: NextFunction) {
    const { classId } = req.params;

    try {
      const result = await ClassDao.find(new mongodb.ObjectId(classId));
      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    const { classId } = req.params;
    const { name, description, classworks, completed } = req.body;

    try {
      const result = await ClassDao.update({
        _id: new mongodb.ObjectId(classId),
        name,
        description,
        classworks,
        completed,
      });
      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  }

  static async destroy(req: Request, res: Response, next: NextFunction) {
    const { classId } = req.params;

    try {
      const result = await ClassDao.delete(new mongodb.ObjectId());
      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  }
}

export default ClassController;
