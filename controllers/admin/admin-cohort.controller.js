const cohorts = require("../../dao/cohort.dao");

function AdminCohortController() {
  this.index = async function index(req, res, next) {
    const result = await cohorts.getCohorts();
    res.json(result);
  };
}

const adminCohortController = new AdminCohortController();

Object.freeze(adminCohortController);

module.exports = adminCohortController;
