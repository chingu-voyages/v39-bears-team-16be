const { passport, logDao } = require('./index'); //this needs update since migration

function SignInController() {
  this.store = (req, res, next) => {
    // eslint-disable-next-line no-unused-vars
    passport.authenticate('local', async (err, user, info, status) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).send({ error: { message: info.message } });
      }

      await logDao.login(user.email);

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
