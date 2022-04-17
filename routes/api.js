const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller.js");

router.get("/", (req, res) => {
  res.send("hello world from express router!");
});

router.get("/users", userController.getUsersAPI);

module.exports = router;
