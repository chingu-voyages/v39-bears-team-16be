const classDao = require('../../dao/class.dao');

function ClassController() {
  this.index = async (req, res, next) => {
    const { planId } = req.params;
    try {
      const result = await classDao.all(planId);
      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  };

  this.store = async (req, res, next) => {
    const { planId } = req.params;
    const { name, description } = req.body;
    try {
      const result = await classDao.create({ planId, name, description });
      return res.status(201).send({ msg: 'success!', data: result });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  };

  this.show = async (req, res, next) => {
    const { classId } = req.params;
    try {
      const result = await classDao.find(classId);
      return res.status(200).send(result);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  };

  this.update = async (req, res, next) => {
    const { classId } = req.params;
    const { name, description, completed } = req.body;

    try {
      const result = await classDao.update({
        _id: classId,
        name,
        description,
        completed,
      });
      return res.status(200).send(result);
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
