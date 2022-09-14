/* eslint-disable no-underscore-dangle */
const planDao = require('../../dao/plan.dao');
const { userDao } = require('./auth');

function PlanController() {
  this.index = async (req, res, next) => {
    try {
      const plans = await planDao.all();
      return res.status(200).json({ plans });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  };

  this.store = async (req, res, next) => {
    const { name, description, thumbnail } = req.body;
    try {
      const result = await planDao.create({
        name,
        description,
        thumbnail,
        createdBy: req.user.email,
      });
      return res.status(201).send({ msg: 'success!', data: result });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  };

  this.show = async (req, res, next) => {
    const { planId } = req.params;
    const { email } = req.user;

    try {
      const values = await Promise.allSettled([userDao.findPlan({ email, planId }), planDao.find(planId)]);

      const result = values.reduce((acc, value) => acc.concat(value.value), []);

      const plan = { ...result[0], ...result[1] };

      return res.status(200).json({ plan });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  };

  this.showByUser = async (req, res, next) => {
    const { email } = req.user;

    try {
      const plans = await planDao.allByUser(email);
      return res.status(200).json({ plans });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  };

  this.update = async (req, res, next) => {
    const { planId } = req.params;
    // eslint-disable-next-line object-curly-newline
    const { name, description, thumbnail, visible, tags, likes } = req.body;

    try {
      const result = await planDao.update({
        _id: planId,
        name,
        description,
        thumbnail,
        visible,
        likes,
        tags,
      });
      return res.status(200).send(result);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  };

  this.destroy = async (req, res, next) => {
    const { planId } = req.params;

    try {
      const result = await planDao.delete(planId);
      return res.status(200).send(result);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  };
}

const planController = new PlanController();

Object.freeze(planController);

module.exports = planController;
