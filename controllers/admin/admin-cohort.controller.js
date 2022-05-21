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
}

const adminCohortController = new AdminCohortController();

Object.freeze(adminCohortController);

module.exports = adminCohortController;
