const classworkTypes = require("../../dao/classwork-type.dao");

function DashboardController() {
  this.index = async function store(req, res, next) {
    const types = await classworkTypes.getTypes();
    console.log(types);
    res.render("./admin/dashboard", {types});
  };
}

const dashboardController = new DashboardController();

Object.freeze(dashboardController);

module.exports = dashboardController;
