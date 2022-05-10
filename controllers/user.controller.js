const users = require("../dao/user.dao");
const { hashPassword } = require("../utilities/password.util");
const { validationResult } = require("express-validator");
const userStoreRequest = require("../middlewares/requests/user-store.request");

function UserController() {
  this.store = 
    [
      userStoreRequest,
      (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

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
      }
    ]
}

const userController = new UserController();

Object.freeze(userController);

module.exports = userController;
