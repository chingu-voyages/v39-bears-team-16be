const users = require("../dao/user.dao");
const { hashPassword } = require("../utilities/password.util");

function UserController() {
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
      res.status(200).send({ success: true, message: "user has been created" });
    } catch (err) {
      next(err);
    }
  };
}

const userController = new UserController();

Object.freeze(userController);

module.exports = userController;
