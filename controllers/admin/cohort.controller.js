const cohorts = require("../../dao/cohort.dao");

function CohortController() {
  this.index = async function store(req, res, next) {
    const result = await cohorts.getCohorts();
    res.render("./admin/index", { cohorts: result});
  };
}

const cohortController = new CohortController();

Object.freeze(cohortController);

module.exports = cohortController;
