/* eslint-disable object-curly-newline */
/* eslint-disable no-underscore-dangle */
const classDao = require('../../dao/class.dao');
const planDao = require('../../dao/plan.dao');
const { userDao } = require('./auth');

function ClassController() {
  this.index = async (req, res, next) => {
    const { planId } = req.params;
    const { email } = req.user;

    try {
      const values = await Promise.allSettled([
        planDao.allClasses(planId),
        userDao.findPlan({ email, planId }),
      ]);

      const planResult = values[0].value; // object
      const userResult = values[1].value[0]; // object

      const classProgresses = userResult.classes.reduce(
        (acc, item) => ({
          ...acc,
          [item.classId]: item.progress,
        }),
        {},
      );

      planResult.classes = planResult.classes.map((item) => ({
        ...item,
        progress: classProgresses[item._id.toString()],
      }));

      // attach plan progress
      const plan = {
        ...planResult,
        progress: userResult.progress,
      };

      return res.status(200).json({ plan });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  };

  this.store = async (req, res, next) => {
    const { planId } = req.params;
    const { name, description } = req.body;
    try {
      const classId = await classDao.create({ name, description });
      const addClass = await planDao.addClass({ planId, classId });

      return res.status(201).json({ msg: 'success!', data: addClass });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  };

  this.show = async (req, res, next) => {
    const { classId } = req.params;
    try {
      const result = await classDao.find(classId);
      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  };

  this.update = async (req, res, next) => {
    const { classId } = req.params;
    const { name, description, classworks, completed } = req.body;

    try {
      const result = await classDao.update({
        _id: classId,
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
  };

  this.destroy = async (req, res, next) => {
    const { classId } = req.params;

    try {
      const result = await classDao.delete(classId);
      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  };
}

const classController = new ClassController();

Object.freeze(classController);

module.exports = classController;
