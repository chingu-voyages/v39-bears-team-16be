const classes = require('../../dao/class.dao');

function AdminClassworkController() {
  this.store = async (req, res) => {
    const { classId, name, body } = req.body;
    try {
      const result = await classes.insertClasswork({ classId, name, body });
      return res.status(201).send(result);
    } catch (err) {
      console.error(err);
      return err;
    }
  };
}

const adminClassworkController = new AdminClassworkController();

Object.freeze(adminClassworkController);

module.exports = adminClassworkController;
