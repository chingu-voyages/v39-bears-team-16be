const passport = require('../middlewares/passport.middleware');

function LoginController() {
  this.store = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.status(401).send({ error: { message: info.message } });
      }
      return req.logIn(user, (error) => {
        if (error) {
          return next(error);
        }
        return res.status(200).send(user);

      });
    })(req, res, next);
  };
}

const loginController = new LoginController();

Object.freeze(loginController);

module.exports = loginController;
