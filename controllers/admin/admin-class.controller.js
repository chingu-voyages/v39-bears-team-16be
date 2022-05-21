function AdminClassController() {
  this.index = function index(req, res, next) {
    const cohortId = req.params.cohortId;
    res.status(200).send({ cohortId });
  };
  
}

const adminClassController = new AdminClassController();

Object.freeze(adminClassController);

module.exports = adminClassController;
