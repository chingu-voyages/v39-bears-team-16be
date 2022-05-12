function StudentDashboardController() {
  this.index = function index(req, res, next) {
    res.status(200).send({ message: "Authorized" });
  };
}

const studentDashboardController = new StudentDashboardController();

Object.freeze(studentDashboardController);

module.exports = studentDashboardController;
