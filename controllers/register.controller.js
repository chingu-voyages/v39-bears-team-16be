const users = require("../dao/user.dao");
const { hashPassword } = require("../utilities/password.util");

function RegisterController() {
  this.store = async function store(req, res, next) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const { hashedPassword, salt } = hashPassword(password);

    const user = {
      name,
      email,
      password: hashedPassword,
      salt,
    };

    try {
      await users.insertUser(user);
      res.status(200).send({ success: true, message: "A user has been created." });
    } catch (err) {
      return next(err);
    }
  };
}

const registerController = new RegisterController();

Object.freeze(registerController);

module.exports = registerController;
