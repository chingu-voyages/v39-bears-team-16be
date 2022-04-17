const User = require("../models/users.model.js");

function UserController() {
  this.getUsersAPI = async function(req, res, next) {
    try {
      const users = await User.getUsers();
      res.json(users)
    } catch (err) {
      console.error(err);
    }
  }
}

const userController = new UserController() 

Object.freeze(userController);

module.exports = userController