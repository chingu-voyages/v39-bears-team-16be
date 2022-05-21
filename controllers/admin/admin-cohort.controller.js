const cohorts = require("../../dao/cohort.dao");

function AdminCohortController() {
  this.index = async function index(req, res, next) {
    const result = await cohorts.getCohorts();
    res.status(200).send(result);
  };

  this.store = async function store(req, res, next) {
    const name = req.body.name;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    const cohort = {
      name, startDate, endDate
    }
    console.log(cohort);
    try {
      const result = await cohorts.insertCohort(cohort);
      res.status(200).send({ msg: "success!", data : result })
    } catch (err) {
      res.status(500).send({ msg: "couldn't insert cohort" })
      console.error(err);
    }
  }
}

const adminCohortController = new AdminCohortController();

Object.freeze(adminCohortController);

module.exports = adminCohortController;
