const express = require("express");
const router = express.Router();
const userStoreRequest = require("../middlewares/requests/user-store.request");
const loginStoreRequest = require("../middlewares/requests/login-store.request");
const forgotPasswordRequest = require("../middlewares/requests/forgot-password.request");
const { isAuth } = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller.js");
const loginController = require("../controllers/login.controller");
const forgotPasswordController = require("../controllers/forgot-password.controller");
const passport = require("../middlewares/passport.middleware");

router.get("/", (req, res) => {
  res.render("index");
});

router
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post(
    loginStoreRequest,
    loginController.store,
    passport.authenticate("local", {
      failureRedirect: "/login",
      successRedirect: "/dashboard",
    })
  );

router
  .route("/register")
  .get((req, res) => {
    res.render("register");
  })
  .post(userStoreRequest, userController.store);

router.post("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/login");
});

router.get("/dashboard", isAuth, (req, res) => {
  res.render("dashboard");
});

router
  .route("/forgot-password")
  .get((req, res) => {
    res.render("forgot-password");
  })
  .post(forgotPasswordRequest, forgotPasswordController.store);

module.exports = router;
