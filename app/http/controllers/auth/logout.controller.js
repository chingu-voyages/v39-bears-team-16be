function LogoutController() {
  this.store = (req, res) => {
    req.logout();
    return res.status(200).send({ message: 'Success' });
  };
}

const logoutController = new LogoutController();

Object.freeze(logoutController);

module.exports = logoutController;
