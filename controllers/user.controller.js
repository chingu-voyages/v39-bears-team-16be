const users = require("../dao/user.dao");
const { hashPassword } = require("../utilities/password.util");
const { validationResult } = require("express-validator");

function UserController() {
  this.store = async function store(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

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
      res.status(200).send({ success: true, message: "user created" });
    } catch (err) {
      console.error(err);
    }
  };
}

const userController = new UserController();

Object.freeze(userController);

module.exports = userController;
