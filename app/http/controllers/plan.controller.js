const planDao = require('../../dao/plan.dao');

function PlanController() {
  this.index = async (req, res, next) => {
    try {
      const plans = await planDao.all();
      return res.status(200).send(plans);
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

    try {
      const plan = await planDao.find(planId);
      return res.status(200).send(plan);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  };

  this.update = async (req, res, next) => {
    const { planId } = req.params;
    // eslint-disable-next-line object-curly-newline
    const { name, description, thumbnail, visibility, tags } = req.body;

    try {
      const result = await planDao.update({
        _id: planId,
        name,
        description,
        thumbnail,
        visibility,
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
