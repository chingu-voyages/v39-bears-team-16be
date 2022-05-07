const classes = require("../../dao/class.dao");

function DashboardController() {
  this.index = async function store(req, res, next) {
    const cohortId = req.params.cohortId;
    const result = await classes.getClassesByCohort(cohortId);
    res.render("./admin/dashboard", { classes : result });
  };
}

const dashboardController = new DashboardController();

Object.freeze(dashboardController);

module.exports = dashboardController;
