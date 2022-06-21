const { passport, userDao } = require('./index');

function SignInController() {
  this.store = (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        res.status(401).send({ error: { message: info.message } });
      }

      await userDao.login();

      return req.login(user, (e) => {
        if (e) {
          return next(e);
        }
        return res.status(200).send(user);
      });
    })(req, res, next);
  };
}

const signInController = new SignInController();

Object.freeze(signInController);

module.exports = signInController;
