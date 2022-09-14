const { logDao } = require('./index');

function LogoutController() {
  this.store = async (req, res, next) => {
    try {
      await logDao.logout(req.user.email);
      req.logout();
      return res.status(200).send({ message: 'Success' });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  };
}

const logoutController = new LogoutController();

Object.freeze(logoutController);

module.exports = logoutController;
