const classes = require('../../dao/class.dao');

function AdminClassController() {
  this.index = async (req, res) => {
    const { cohortId } = req.params;
    const result = await classes.getClassesByCohortId(cohortId);
    res.status(200).json(result);
  };

  this.store = async (req, res) => {
    const { name, subject, date } = req.body;
    const { cohortId } = req.params;

    const classObj = {
      name,
      subject,
      date,
      cohortId,
    };

    try {
      const result = await classes.insertClass(classObj);
      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  };
  
}

const adminClassController = new AdminClassController();

Object.freeze(adminClassController);

module.exports = adminClassController;
