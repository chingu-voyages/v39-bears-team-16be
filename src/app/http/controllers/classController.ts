/* eslint-disable no-underscore-dangle */
import ClassDao from '../../dao/classDao';
import UserDao from '../../dao/userDao';
import { Request, Response, NextFunction } from 'express';
import * as mongodb from 'mongodb';
import ProgressDao from '../../dao/progressDao';
import { ClassInterface } from '../../models/ClassModel';
import { ProgressClassInterface, ProgressInterface } from '../../models/ProgressModel';

const planDao = require('../../dao/plan.dao');

class ClassController {
  static async index(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      return res.status(403);
    }

    const { planId } = req.params;
    const { email } = req.user;

    try {
      const plan = await planDao.allClasses(planId);
      const progress = await ProgressDao.findOne(email, planId);

      if (!progress) {
        throw new Error('failed to fetch progress');
      }

      plan.planProgress = progress.planProgress;

      plan.classes = [...plan.classes].map((planClass) => {
        const progressClass = [...progress.classes].find(
          (progressClass) => progressClass.classId.toString() === planClass._id.toString()
        );

        return {
          ...planClass,
          classProgress: progressClass.classProgress,
          classworks: [...planClass.classworks].map((planClass) => {
            const progressClasswork = [...progressClass.classworks].find(
              (progressClass) => progressClass.classworkId.toString() === planClass._id.toString()
            );

            return {
              ...planClass,
              classworkProgress: progressClasswork.classworkProgress,
            };
          }),
        };
      });

      return res.status(200).json({ plan });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  }

  static async store(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      return res.sendStatus(403);
    }

    const { planId } = req.params;
    const { name, description } = req.body;
    const { email } = req.user;

    try {
      const plan = await planDao.find(planId);

      if (plan.createdBy !== email) {
        return res.sendStatus(403);
      }

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
      const result = await ClassDao.delete(new mongodb.ObjectId(classId));
      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  }
}

export default ClassController;
