const cohorts = require('../../dao/cohort.dao');

function AdminCohortController() {
  this.index = async (req, res) => {
    const result = await cohorts.getCohorts();
    res.status(200).send(result);
  };

  this.store = async (req, res) => {
    const { name, startDate, endDate } = req.body;

    const cohort = {
      name,
      startDate,
      endDate,
    };

    try {
      const result = await cohorts.insertCohort(cohort);
      res.status(200).send({ msg: 'success!', data: result });
    } catch (err) {
      res.status(500).send({ msg: "couldn't insert cohort", data: err });
      console.error(err);
    }
  };

  this.destroy = async (req, res) => {
    const { cohortId } = req.params;

    console.log(cohortId);

    try {
      const result = await cohorts.deleteCohort(cohortId);
      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).send({ msg: "couldn't delete cohort", data: err });
    }
  };
}

const adminCohortController = new AdminCohortController();

Object.freeze(adminCohortController);

module.exports = adminCohortController;
