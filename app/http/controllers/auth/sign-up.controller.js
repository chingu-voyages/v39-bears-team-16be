const { userDao, hashPassword } = require('./index');

function SignUpControlle() {
  this.store = async (req, res, next) => {
    const { name, email, password } = req.body;
    const { hash, salt } = hashPassword(password);

    try {
      await userDao.create({
        name,
        email,
        hash,
        salt,
      });
      return res
        .status(200)
        .send({ success: true, message: 'A user has been created.' });
    } catch (err) {
      return next(err);
    }
  };
}

const signUpController = new SignUpControlle();

Object.freeze(signUpController);

module.exports = signUpController;
