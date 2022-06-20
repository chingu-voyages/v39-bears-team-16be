const users = require('../dao/user.dao');
const { hashPassword } = require('../utilities/password.util');

function RegisterController() {
  this.store = async (req, res, next) => {
    const { name, email, password } = req.body;

    const { hashedPassword, salt } = hashPassword(password);

    const user = {
      name,
      email,
      password: hashedPassword,
      salt,
    };

    try {
      await users.insertUser(user);
      return res
        .status(200)
        .send({ success: true, message: 'A user has been created.' });
    } catch (err) {
      return next(err);
    }
  };
}

const registerController = new RegisterController();

Object.freeze(registerController);

module.exports = registerController;
