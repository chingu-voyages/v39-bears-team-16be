function LogoutController() {
  this.store = function store(req, res) {
    req.logout();
    res.status(200).send({ message:"Success" })
  };
}

const logoutController = new LogoutController();

Object.freeze(logoutController);

module.exports = logoutController;
