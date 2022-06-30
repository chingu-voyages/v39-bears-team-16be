const classDao = require('../../dao/class.dao');

function ClassworkController() {
  this.index = async (req, res, next) => {
    const { classId } = req.params;
    try {
      const classworks = await classDao.allClassworks(classId);
      return res.status(200).send(classworks);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  };

  this.store = async (req, res, next) => {
    const { classId } = req.params;
    const { name, description, type } = req.body;

    try {
      const result = await classDao.createClasswork({
        classId,
        name,
        description,
        type,
      });
      return res.status(200).json({ data: result });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  };
}

const classworkController = new ClassworkController();

Object.freeze(classworkController);

module.exports = classworkController;
