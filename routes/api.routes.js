const express = require("express");
const router = express.Router();
const userStoreRequest = require("../middlewares/requests/user-store.request");
const loginStoreRequest = require("../middlewares/requests/login-store.request");
const { isAuth } = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller.js");
const loginController = require("../controllers/login.controller");
const passport = require("../middlewares/passport.middleware");
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", loginStoreRequest, loginController.store, passport.authenticate("local", {
  failureRedirect: "/login",
  successRedirect: "/dashboard",
}));

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", userStoreRequest, userController.store);

router.post("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/login");
});

router.get("/dashboard", isAuth, (req, res) => {
  res.render("dashboard");
});

module.exports = router;
