const userDao = require('../../../dao/user.dao');
const { hashPassword } = require('../../../../utilities/password.util');

function SignUpControlle() {
  this.store = async (req, res, next) => {
    const { name, email, password } = req.body;

    const { hash, salt } = hashPassword(password);

    const user = {
      name,
      email,
      hash,
      salt,
    };

    try {
      await userDao.create(user);
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
