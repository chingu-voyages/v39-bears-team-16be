function StudentDashboardController() {
  this.store = function store(req, res) {
    res.status(200).send({ message: "Authorized" });
  };
}

const studentDashboardController = new StudentDashboardController();

Object.freeze(studentDashboardController);

module.exports = studentDashboardController;
